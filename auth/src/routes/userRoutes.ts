import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { BadRequestError, validateRequest } from "@kmevents/common";

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

export { route as useroutes };
