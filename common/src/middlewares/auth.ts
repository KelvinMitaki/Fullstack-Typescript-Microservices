import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieSession from "cookie-session";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

interface JWT {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  knownAs?: string;
  gender?: string;
  birthDate?: Date;
  homeTown?: string;
  status?: string;
  aboutMe?: string;
  hobbies?: string[];
  occupation?: string;
  originCountry?: string;
  events?: { [key: string]: string }[];
  following?: { [key: string]: string }[];
  followers?: { [key: string]: string }[];
  photos?: string[];
  age?: number;
  interests?: string[];
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: JWT;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as JWT;
    req.currentUser = payload;
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
