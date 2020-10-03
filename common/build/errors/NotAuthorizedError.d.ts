import { CustomError } from "./CustomError";
import { ErrorResult } from "./RequestValidationError";
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors: () => ErrorResult[];
}
