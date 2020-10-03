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
exports.NotFound = void 0;
var CustomError_1 = require("./CustomError");
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        var _this = _super.call(this, "Route not found") || this;
        _this.statusCode = 404;
        _this.serializeErrors = function () {
            return [{ message: "Route not found" }];
        };
        Object.setPrototypeOf(_this, NotFound.prototype);
        return _this;
    }
    return NotFound;
}(CustomError_1.CustomError));
exports.NotFound = NotFound;
