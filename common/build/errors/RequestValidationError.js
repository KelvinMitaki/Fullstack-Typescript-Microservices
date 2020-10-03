"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
var CustomError_1 = require("./CustomError");
var RequestValidationError = /** @class */ (function (_super) {
    __extends(RequestValidationError, _super);
    function RequestValidationError(errors) {
        var _this = _super.call(this, "Validation Failed") || this;
        _this.errors = errors;
        _this.statusCode = 401;
        _this.serializeErrors = function () {
            return _this.errors.map(function (err) { return ({
                message: err.msg,
                field: err.param
            }); });
        };
        Object.setPrototypeOf(_this, RequestValidationError.prototype);
        return _this;
    }
    return RequestValidationError;
}(CustomError_1.CustomError));
exports.RequestValidationError = RequestValidationError;
