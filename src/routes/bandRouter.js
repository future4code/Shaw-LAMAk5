"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandRouter = void 0;
var express_1 = __importDefault(require("express"));
var BandBusiness_1 = require("../business/BandBusiness");
var BandController_1 = require("../controller/BandController");
var BandDataBase_1 = require("../data/BandDataBase");
var Authenticator_1 = require("../services/Authenticator");
var IdGenerator_1 = require("../services/IdGenerator");
exports.bandRouter = express_1.default.Router();
var bandBusiness = new BandBusiness_1.BandBusiness(new BandDataBase_1.BandDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
var bandController = new BandController_1.BandController(bandBusiness);
exports.bandRouter.post("/newBand", bandController.createBand);
exports.bandRouter.get("/getBand/:name", bandController.getBand);
