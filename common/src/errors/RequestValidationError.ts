import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export interface ErrorResult {
  message: string;
  field?: string;
}

export class RequestValidationError extends CustomError {
  statusCode = 401;
  constructor(public errors: ValidationError[]) {
    super("Validation Failed");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors = (): ErrorResult[] => {
    return this.errors.map(
      (err: ValidationError): ErrorResult => ({
        message: err.msg,
        field: err.param
      })
    );
  };
}
