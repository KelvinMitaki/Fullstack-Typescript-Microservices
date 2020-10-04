"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("cookie-session");
var NotAuthorizedError_1 = require("../errors/NotAuthorizedError");
exports.auth = function (req, res, next) {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        throw new NotAuthorizedError_1.NotAuthorizedError();
    }
    try {
        var payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (error) {
        throw new NotAuthorizedError_1.NotAuthorizedError();
    }
};
