import express from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandDatabase } from "../data/BandDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export const bandRouter = express.Router();

const bandBusiness = new BandBusiness(
    new BandDatabase(),
    new IdGenerator(),
    new Authenticator()
)

const bandController = new BandController(bandBusiness);

bandRouter.post("/newBand", bandController.createBand);
bandRouter.get("/getBand/:name", bandController.getBand);