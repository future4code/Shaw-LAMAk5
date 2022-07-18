"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGeneratorMock = void 0;
var User_1 = require("../../src/model/User");
var TokenGeneratorMock = /** @class */ (function () {
    function TokenGeneratorMock() {
        this.generate = function (input) {
            return "token";
        };
    }
    TokenGeneratorMock.prototype.verify = function (token) {
        switch (token) {
            case "token de normal user":
                return {
                    id: "id_user_1",
                    role: User_1.UserRole.NORMAL
                };
            case "token de admin user":
                return {
                    id: "id_user_2",
                    role: User_1.UserRole.ADMIN
                };
            default:
                return undefined;
        }
    };
    return TokenGeneratorMock;
}());
exports.TokenGeneratorMock = TokenGeneratorMock;
