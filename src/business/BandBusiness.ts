import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandDatabase } from "../data/BandDataBase";
import { BandInputDTO } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandBusiness {
    constructor(
        private bandData: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }
    createBand = async (band: BandInputDTO, token:string) => {       
        
        const { name, music_genre, responsible } = band
        if (!name || !music_genre || !responsible) {
            throw new BaseError(422, "Invalid fields")

        }
        const registeredBand = await this.bandData.getBandByName(band.name)
        if (registeredBand) {
            throw new BaseError(422, "Band already registered")
        }
        const id = this.idGenerator.generate();     

        const verifyToken = this.authenticator.getData( token );
        if (verifyToken.role !== "ADMIN") {
            throw new BaseError(401, "Only admins can register bands")
        }
        
        return await this.bandData.createBand(id, name, music_genre, responsible);
    }

    getBandByName = async (name: string, token:string) => {

        if (!name) {
            throw new BaseError(422, "Enter the name of the desired band")
        }
        const bandFromDB = await this.bandData.getBandByName(name)

        if (!bandFromDB) {
            throw new BaseError(404, "Band not found")
        }
        const verifyToken = this.authenticator.getData(token);

        return bandFromDB;
    }
}