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
exports.BandBusiness = void 0;
var BaseError_1 = require("../error/BaseError");
var BandBusiness = /** @class */ (function () {
    function BandBusiness(bandData, idGenerator, authenticator) {
        var _this = this;
        this.bandData = bandData;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.createBand = function (band, token) { return __awaiter(_this, void 0, void 0, function () {
            var name, music_genre, responsible, registeredBand, id, verifyToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = band.name, music_genre = band.music_genre, responsible = band.responsible;
                        if (!name || !music_genre || !responsible) {
                            throw new BaseError_1.BaseError(422, "Invalid fields");
                        }
                        return [4 /*yield*/, this.bandData.getBandByName(band.name)];
                    case 1:
                        registeredBand = _a.sent();
                        if (registeredBand) {
                            throw new BaseError_1.BaseError(422, "Band already registered");
                        }
                        id = this.idGenerator.generate();
                        verifyToken = this.authenticator.getData(token);
                        if (verifyToken.role !== "ADMIN") {
                            throw new BaseError_1.BaseError(401, "Only admins can register bands");
                        }
                        return [4 /*yield*/, this.bandData.createBand(id, name, music_genre, responsible)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getBandByName = function (name, token) { return __awaiter(_this, void 0, void 0, function () {
            var bandFromDB, verifyToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new BaseError_1.BaseError(422, "Enter the name of the desired band");
                        }
                        return [4 /*yield*/, this.bandData.getBandByName(name)];
                    case 1:
                        bandFromDB = _a.sent();
                        if (!bandFromDB) {
                            throw new BaseError_1.BaseError(404, "Band not found");
                        }
                        verifyToken = this.authenticator.getData(token);
                        return [2 /*return*/, bandFromDB];
                }
            });
        }); };
    }
    return BandBusiness;
}());
exports.BandBusiness = BandBusiness;
