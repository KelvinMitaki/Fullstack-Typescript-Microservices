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
exports.DatabaseConnectionError = void 0;
var CustomError_1 = require("./CustomError");
var DatabaseConnectionError = /** @class */ (function (_super) {
    __extends(DatabaseConnectionError, _super);
    function DatabaseConnectionError() {
        var _this = _super.call(this, "Error connecting to the database") || this;
        _this.statusCode = 500;
        _this.serializeErrors = function () {
            return [{ message: "Error connecting to the database" }];
        };
        Object.setPrototypeOf(_this, DatabaseConnectionError.prototype);
        return _this;
    }
    return DatabaseConnectionError;
}(CustomError_1.CustomError));
exports.DatabaseConnectionError = DatabaseConnectionError;
