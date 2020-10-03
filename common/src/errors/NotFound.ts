import { CustomError } from "./CustomError";
import { ErrorResult } from "./RequestValidationError";

export class NotFound extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFound.prototype);
  }
  serializeErrors = (): ErrorResult[] => {
    return [{ message: "Route not found" }];
  };
}
