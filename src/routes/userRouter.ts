import express from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { ShowController } from "../controller/ShowController";
import { UserController } from "../controller/UserController";
import { ShowDatabase } from "../data/ShowDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export const userRouter = express.Router();

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
)

const userController = new UserController(userBusiness);


const showBusiness = new ShowBusiness(
    new ShowDatabase(),
    new Authenticator(),
    new IdGenerator(),
)
const showController = new ShowController(showBusiness)

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

userRouter.post("/create", showController.createShow);
