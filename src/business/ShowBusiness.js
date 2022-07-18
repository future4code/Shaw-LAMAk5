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
exports.ShowBusiness = void 0;
var BaseError_1 = require("../error/BaseError");
var Show_1 = require("../model/Show");
var ShowBusiness = /** @class */ (function () {
    function ShowBusiness(showDatabase, authenticator, idGenerator) {
        var _this = this;
        this.showDatabase = showDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        // pegar todos os shows
        this.checkShow = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showDatabase.getAllShow()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.createShow = function (token, newShow) { return __awaiter(_this, void 0, void 0, function () {
            var band_id, week_day, start_time, end_time, authorization, checkShow, id, showData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        band_id = newShow.band_id, week_day = newShow.week_day, start_time = newShow.start_time, end_time = newShow.end_time;
                        if (!token || !band_id || !week_day || !start_time || !end_time) {
                            throw new BaseError_1.BaseError(422, "All fields need to be filled");
                        }
                        if (week_day.toUpperCase() !== "SEXTA" &&
                            week_day.toUpperCase() != "SABADO" &&
                            week_day.toUpperCase() != "DOMINGO") {
                            throw new BaseError_1.BaseError(422, "Choose between Friday, Saturday and Sunday");
                        }
                        authorization = this.authenticator.getData(token);
                        if (!authorization) {
                            throw new BaseError_1.BaseError(422, "Invalid Token");
                        }
                        //verificando horario
                        if (start_time < 8 || start_time > 22) {
                            throw new BaseError_1.BaseError(422, "Invalid start time");
                        }
                        if (end_time < 9 || end_time > 23) {
                            throw new BaseError_1.BaseError(422, "Invalid end time");
                        }
                        if (start_time >= end_time) {
                            throw new BaseError_1.BaseError(422, "Invalid time");
                        }
                        return [4 /*yield*/, this.checkShow()];
                    case 1:
                        checkShow = _a.sent();
                        checkShow.map(function (show) {
                            if (week_day === show.week_day && start_time === show.start_time) {
                                throw new BaseError_1.BaseError(422, "There is already a show for the same period");
                            }
                        });
                        id = this.idGenerator.generate();
                        showData = Show_1.Show.toShowModel(newShow);
                        return [4 /*yield*/, this.showDatabase.insertShow(id, showData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "Show criado"];
                }
            });
        }); };
        this.verifyDay = function (day) { return __awaiter(_this, void 0, void 0, function () {
            var token, week_day, authorization, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = day.token, week_day = day.week_day;
                        if (!token || !week_day) {
                            throw new BaseError_1.BaseError(422, "All fields need to be filled");
                        }
                        authorization = this.authenticator.getData(token);
                        if (!authorization) {
                            throw new BaseError_1.BaseError(422, "Invalid token");
                        }
                        return [4 /*yield*/, this.showDatabase.getShowDay(week_day)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
    }
    return ShowBusiness;
}());
exports.ShowBusiness = ShowBusiness;
