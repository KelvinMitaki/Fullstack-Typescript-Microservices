import { Request, Response, NextFunction } from "express";
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
    events?: {
        [key: string]: string;
    }[];
    following?: {
        [key: string]: string;
    }[];
    followers?: {
        [key: string]: string;
    }[];
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
export declare const auth: (req: Request, res: Response, next: NextFunction) => void;
export {};
