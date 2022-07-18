"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
var BaseError_1 = require("../error/BaseError");
var UserBusiness = /** @class */ (function () {
    function UserBusiness(userData, idGenerator, hashManager, authenticator) {
        var _this = this;
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.createUser = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var name, password, email, role, registeredUser, id, hashPassword, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = input.name, password = input.password, email = input.email, role = input.role;
                        if (!name || !email || !password || !role) {
                            throw new BaseError_1.BaseError(422, "Invalid fields");
                        }
                        if (email.indexOf("@") === -1) {
                            throw new BaseError_1.BaseError(422, "Invalid email");
                        }
                        if (password.length < 6) {
                            throw new BaseError_1.BaseError(422, "Invalid password");
                        }
                        if (role !== "NORMAL" && role !== "ADMIN") {
                            throw new BaseError_1.BaseError(422, "Invalid user role");
                        }
                        return [4 /*yield*/, this.userData.getUserByEmail(email)];
                    case 1:
                        registeredUser = _a.sent();
                        if (registeredUser) {
                            throw new BaseError_1.BaseError(422, "E-mail already registered");
                        }
                        id = this.idGenerator.generate();
                        return [4 /*yield*/, this.hashManager.hash(password)];
                    case 2:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, this.userData.signup(id, name, email, hashPassword, role)];
                    case 3:
                        _a.sent();
                        accessToken = this.authenticator.generateToken({ id: id, role: role });
                        return [2 /*return*/, accessToken];
                }
            });
        }); };
        this.getUserByEmail = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var email, password, userFromDB, hashCompare, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = user.email, password = user.password;
                        if (!email || !password) {
                            throw new BaseError_1.BaseError(422, "'email' and 'password' are required");
                        }
                        if (email.indexOf("@") === -1) {
                            throw new BaseError_1.BaseError(422, "Invalid email");
                        }
                        if (password.length < 6) {
                            throw new BaseError_1.BaseError(422, "Invalid password");
                        }
                        return [4 /*yield*/, this.userData.getUserByEmail(user.email)];
                    case 1:
                        userFromDB = _a.sent();
                        if (!userFromDB) {
                            throw new BaseError_1.BaseError(401, "User not found");
                        }
                        return [4 /*yield*/, this.hashManager.compare(user.password, userFromDB.getPassword())];
                    case 2:
                        hashCompare = _a.sent();
                        if (!hashCompare) {
                            throw new BaseError_1.BaseError(401, "Incorrect password");
                        }
                        accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
                        return [2 /*return*/, accessToken];
                }
            });
        }); };
    }
    return UserBusiness;
}());
exports.UserBusiness = UserBusiness;
