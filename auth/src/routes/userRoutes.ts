import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const route = Router();

export interface Jwt {
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: Jwt;
    }
  }
}

route.get("/user/current_user", (req: Request, res: Response): void => {
  if (!req.session!.jwt) {
    res.send({ currentUser: null });
    return;
  }
  req.currentUser = jwt.verify(req.session!.jwt, process.env.JWT_KEY!) as Jwt;
  res.send({ currentUser: req.currentUser });
});

route.post(
  "/user/register",
  check("email").trim().isEmail().withMessage("Please enter a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters minimum"),
  check("firstName").trim().notEmpty().withMessage("enter a valid firstname"),
  check("lastName").trim().notEmpty().withMessage("enter a valid lastname"),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ message: errors.array()[0].msg });
      return;
    }
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    if (password !== confirmPassword) {
      res.status(401).send({ message: "passwords do not match" });
      return;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(401)
        .send({ message: "A user with that email already exists" });
      return;
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
    const userJwt = jwt.sign({ ...user._doc }, process.env.JWT_KEY!);
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
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ message: errors.array()[0].msg });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).send({ message: "invalid email or password" });
      return;
    }
    // @ts-ignore
    const userJwt = jwt.sign({ ...user._doc }, process.env.JWT_KEY!);
    req.session = {
      ...req.session,
      jwt: userJwt
    };
    res.send(user);
  }
);

export { route as useroutes };
