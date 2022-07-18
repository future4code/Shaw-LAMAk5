"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var UserBusiness_1 = require("../business/UserBusiness");
var UserController_1 = require("../controller/UserController");
var UserDatabase_1 = require("../data/UserDatabase");
var Authenticator_1 = require("../services/Authenticator");
var HashManager_1 = require("../services/HashManager");
var IdGenerator_1 = require("../services/IdGenerator");
exports.userRouter = express_1.default.Router();
var userBusiness = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
var userController = new UserController_1.UserController(userBusiness);
exports.userRouter.post("/signup", userController.createUser);
exports.userRouter.post("/login", userController.login);
