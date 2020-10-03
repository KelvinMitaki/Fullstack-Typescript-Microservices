import { CustomError } from "./CustomError";
import { ErrorResult } from "./RequestValidationError";
export declare class NotFound extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors: () => ErrorResult[];
}
