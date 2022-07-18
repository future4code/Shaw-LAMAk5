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
var UserBusiness_1 = require("../src/business/UserBusiness");
var hashGeneratorMock_1 = require("./mocks/hashGeneratorMock");
var idGeneratorMock_1 = require("./mocks/idGeneratorMock");
var tokenGeneratorMock_1 = require("./mocks/tokenGeneratorMock");
var userDatabaseMock_1 = require("./mocks/userDatabaseMock");
var userBusinessMock = new UserBusiness_1.UserBusiness(new idGeneratorMock_1.IdGeneratorMock(), new hashGeneratorMock_1.HashGeneratorMock(), new tokenGeneratorMock_1.TokenGeneratorMock(), new userDatabaseMock_1.UserDatabaseMock());
var user = {
    name: "",
    email: "joaoemail@gmail.com",
    password: "123456",
    role: "NORMAL"
};
var user1 = {
    name: "Victor",
    email: "vitoremail.com",
    password: "123456",
    role: "NORMAL"
};
var user2 = {
    name: "Victor",
    email: "vitor@gmail.com",
    password: "12345",
    role: "NORMAL"
};
var user3 = {
    name: "Victor",
    email: "vitor@gmail.com",
    password: "123456",
    role: "batata"
};
describe("Testando o signup", function () {
    test("Deve retornar erro quando o nome está vazio", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, userBusinessMock.createUser(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    expect(error_1.message).toEqual("Invalid fields");
                    expect(error_1.code).toBe(422);
                    return [3 /*break*/, 4];
                case 3:
                    expect.assertions(2);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Deve retornar erro quando o email é inválido (nao tem arroba)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, userBusinessMock.createUser(user1)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_2 = _a.sent();
                    expect(error_2.message).toEqual("Invalid email");
                    expect(error_2.code).toBe(422);
                    return [3 /*break*/, 4];
                case 3:
                    expect.assertions(2);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Deve retornar erro quando senha inválida", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, userBusinessMock.createUser(user2)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_3 = _a.sent();
                    expect(error_3.message).toEqual("Invalid password");
                    expect(error_3.code).toBe(422);
                    return [3 /*break*/, 4];
                case 3:
                    expect.assertions(2);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Deve retornar erro quando receber um role que não existente", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, userBusinessMock.createUser(user3)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_4 = _a.sent();
                    expect(error_4.message).toEqual("Invalid user role");
                    expect(error_4.code).toBe(422);
                    return [3 /*break*/, 4];
                case 3:
                    expect.assertions(2);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    var login1 = {
        email: "vitor@gmail.com",
        password: ""
    };
    var login2 = {
        email: "vitor@gmail.com",
        password: "123456"
    };
    var login3 = {
        email: "vitor@gmail.com",
        password: "1234"
    };
    describe("Testando login", function () {
        test("Deve retornar erro quando o email fornecido não existe", function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, userBusinessMock.getUserByEmail(login1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_5 = _a.sent();
                        expect(error_5.message).toEqual("'email' and 'password' are required");
                        expect(error_5.code).toBe(422);
                        return [3 /*break*/, 4];
                    case 3:
                        expect.assertions(2);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        test("Sucesso no login", function () { return __awaiter(void 0, void 0, void 0, function () {
            var accessToken, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userBusinessMock.getUserByEmail(login2)];
                    case 1:
                        accessToken = _a.sent();
                        expect(accessToken).toEqual("token");
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        test("Deve retornar erro quando senha inválida", function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, userBusinessMock.getUserByEmail(login3)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_7 = _a.sent();
                        expect(error_7.message).toEqual("Invalid password");
                        expect(error_7.code).toBe(422);
                        return [3 /*break*/, 4];
                    case 3:
                        expect.assertions(2);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
