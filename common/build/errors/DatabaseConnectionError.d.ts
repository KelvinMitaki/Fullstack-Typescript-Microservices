import { CustomError } from "./CustomError";
import { ErrorResult } from "./RequestValidationError";
export declare class DatabaseConnectionError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors: () => ErrorResult[];
}
