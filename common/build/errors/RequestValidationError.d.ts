import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";
export interface ErrorResult {
    message: string;
    field?: string;
}
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors: () => ErrorResult[];
}
