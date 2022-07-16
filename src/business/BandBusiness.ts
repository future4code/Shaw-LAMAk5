import { LoginInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandDatabase } from "../data/BandDataBase";
import { BandInputDTO } from "../model/Band";

export class BandBusiness {
    constructor(
        private bandData: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }
    createBand = async (band: BandInputDTO, token:string) => {       
        
        const { name, music_genre, responsible } = band
        if (!name || !music_genre || !responsible) {
            throw new Error("Campos inválidos")

        }
        const registeredBand = await this.bandData.getBandByName(band.name)
        if (registeredBand) {
            throw new Error("Banda já cadastrado")
        }
        const id = this.idGenerator.generate();     

        const verifyToken = this.authenticator.getData( token );
        if (verifyToken.role !== "ADMIN") {
            throw new Error("Apenas administradores podem registrar bandas")
        }
        
        return await this.bandData.createBand(id, name, music_genre, responsible);
    }

    getBandByName = async (name: string, token:string) => {

        if (!name) {
            throw new Error("Informe o nome da banda desejada")
        }
        const bandFromDB = await this.bandData.getBandByName(name)

        if (!bandFromDB) {
            throw new Error("Banda não encontrada")
        }
        const verifyToken = this.authenticator.getData(token);

        return bandFromDB;
    }
}