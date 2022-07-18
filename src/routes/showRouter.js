"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRouter = void 0;
var express_1 = __importDefault(require("express"));
var ShowBusiness_1 = require("../business/ShowBusiness");
var ShowController_1 = require("../controller/ShowController");
var ShowDatabase_1 = require("../data/ShowDatabase");
var Authenticator_1 = require("../services/Authenticator");
var IdGenerator_1 = require("../services/IdGenerator");
exports.showRouter = express_1.default.Router();
var showBusiness = new ShowBusiness_1.ShowBusiness(new ShowDatabase_1.ShowDatabase(), new Authenticator_1.Authenticator(), new IdGenerator_1.IdGenerator());
var showController = new ShowController_1.ShowController(showBusiness);
exports.showRouter.post("/create", showController.scheduleShow);
exports.showRouter.get("/getshow", showController.getShowDay);
