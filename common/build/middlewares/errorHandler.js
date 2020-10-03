"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var CustomError_1 = require("../errors/CustomError");
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof CustomError_1.CustomError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
    }
    return res.status(401).send({ errors: [{ message: err.message }] });
};
