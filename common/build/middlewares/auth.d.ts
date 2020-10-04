import { Request, Response, NextFunction } from "express";
import "cookie-session";
export interface JWT {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: JWT;
        }
    }
}
export declare const auth: (req: Request, res: Response, next: NextFunction) => void;
