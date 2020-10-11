import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import {
  auth,
  BadRequestError,
  NotFound,
  validateRequest
} from "@kmevents/common";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import { UserCreatedPublisher } from "../events/publishers/UserCreatedPublisher";
import { natsWrapper } from "../NatsWrapper";
import { UserUpdatedPublisher } from "../events/publishers/UserUpdatedPublisher";

const route = Router();

export interface Jwt {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: Jwt;
    }
  }
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: "v4",
  region: "eu-west-2"
});

route.get(
  "/user/current_user",
  async (req: Request, res: Response): Promise<void> => {
    if (!req.session!.jwt) {
      res.send({ currentUser: null });
      return;
    }
    try {
      req.currentUser = jwt.verify(
        req.session!.jwt,
        process.env.JWT_KEY!
      ) as Jwt;
      const user = await User.findById(req.currentUser);

      res.send({ currentUser: user });
    } catch (error) {
      res.send({ currentUser: null });
    }
  }
);

route.post(
  "/user/register",
  check("email").trim().isEmail().withMessage("Please enter a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters minimum"),
  check("firstName").trim().notEmpty().withMessage("enter a valid firstname"),
  check("lastName").trim().notEmpty().withMessage("enter a valid lastname"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    if (password !== confirmPassword) {
      throw new BadRequestError("passwords do not match");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequestError("A user with that email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.build({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await user.save();
    new UserCreatedPublisher(natsWrapper.client).publish({
      _id: user._id,
      name: user.firstName,
      photos: user.photos!,
      version: user.version
    });

    // @ts-ignore
    const userJwt = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      },
      process.env.JWT_KEY!
    );
    req.session = {
      ...req.session,
      jwt: userJwt
    };
    res.status(200).send(user);
  }
);

route.post(
  "/user/login",
  check("email").trim().isEmail().withMessage("enter a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password should be 6 characters minimum"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError("invalid email or password");
    }
    // @ts-ignore
    const userJwt = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      },
      process.env.JWT_KEY!
    );
    req.session = {
      ...req.session,
      jwt: userJwt
    };
    res.send(user);
  }
);

route.post(
  "/user/profile/edit",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { password } = req.body;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.findByIdAndUpdate(req.currentUser?._id, {
          ...req.body,
          password: hashedPassword,
          email: req.currentUser?.email,
          firstName: req.currentUser?.firstName,
          lastName: req.currentUser?.lastName
        });
        await user?.save();
        new UserUpdatedPublisher(natsWrapper.client).publish({
          _id: user?._id,
          name: user?.firstName!,
          photos: user?.photos!,
          version: user!.version
        });
        res.send(user);
        return;
      }
      const user = await User.findByIdAndUpdate(req.currentUser?._id, {
        ...req.body,
        email: req.currentUser?.email,
        firstName: req.currentUser?.firstName,
        lastName: req.currentUser?.lastName
      });
      await user?.save();
      new UserUpdatedPublisher(natsWrapper.client).publish({
        _id: user?._id,
        name: user?.firstName!,
        photos: user?.photos!,
        version: user!.version
      });
      res.send(user);
    } catch (error) {
      throw new BadRequestError("error updating profile");
    }
  }
);

route.get(
  "/user/profile/:profileId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.profileId).populate(
      "followers following",
      "firstName lastName photos"
    );
    if (!user) {
      throw new NotFound();
    }
    res.send(user);
  }
);

route.get(
  "/user/image/upload",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const key = `${req.currentUser?._id}/${v4()}.jpeg`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "e-commerce-gig",
        ContentType: "image/jpeg",
        Key: key
      },
      (err: Error, url: string) => {
        if (err) {
          console.log(err);
          throw new BadRequestError("Error obtaining image url");
        }
        res.send({ key, url });
      }
    );
  }
);

route.post(
  "/user/follow/:userId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const userToFollow = await User.findById(req.params.userId);
    if (!userToFollow) {
      throw new BadRequestError("No user with that ID");
    }
    const user = await User.findByIdAndUpdate(req.currentUser?._id, {
      $push: { following: userToFollow._id }
    });
    userToFollow.followers = [user?._id, ...userToFollow.followers];
    await user?.save();
    user!.photos &&
      new UserUpdatedPublisher(natsWrapper.client).publish({
        _id: user?._id,
        name: user!.firstName,
        photos: user!.photos,
        version: user!.version
      });
    await userToFollow.save();
    userToFollow.photos &&
      new UserUpdatedPublisher(natsWrapper.client).publish({
        _id: userToFollow._id,
        name: userToFollow.firstName,
        photos: userToFollow!.photos,
        version: userToFollow.version
      });
    res.send(user);
  }
);

route.post(
  "/user/unfollow/:userId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const userToUnfollow = await User.findById(req.params.userId);
    if (!userToUnfollow) {
      throw new BadRequestError("No user with that ID");
    }
    const user = await User.findById(req.currentUser?._id);
    const userFound = user?.following?.find(
      fol => fol.toHexString() === req.params.userId
    );
    if (!userFound) {
      throw new BadRequestError("You are not following this user");
    }
    user!.following = user?.following?.filter(
      fol => fol.toHexString() !== req.params.userId
    );
    await user?.save();
    user!.photos &&
      new UserUpdatedPublisher(natsWrapper.client).publish({
        _id: user?._id,
        name: user!.firstName,
        photos: user!.photos,
        version: user!.version
      });

    userToUnfollow.followers = userToUnfollow.followers?.filter(
      fol => fol.toHexString() !== user?._id.toHexString()
    );
    await userToUnfollow.save();
    userToUnfollow!.photos &&
      new UserUpdatedPublisher(natsWrapper.client).publish({
        _id: userToUnfollow?._id,
        name: userToUnfollow!.firstName,
        photos: userToUnfollow!.photos,
        version: userToUnfollow!.version
      });

    res.send(user);
  }
);

route.post("/user/logout", auth, (req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

export { route as useroutes };
