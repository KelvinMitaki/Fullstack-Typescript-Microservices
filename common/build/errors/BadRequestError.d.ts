import { CustomError } from "./CustomError";
import { ErrorResult } from "./RequestValidationError";
export declare class BadRequestError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors: () => ErrorResult[];
}
