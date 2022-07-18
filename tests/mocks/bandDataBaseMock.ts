import { Band } from "../../src/model/Band";
import { User } from "../../src/model/User";
import { bandMock1, bandMock2 } from "./bandMock";

export class BandDatabaseMock {

    public async signUp(user: User): Promise<void> {

    }

    public async getBandByName(name: string): Promise<Band | undefined> {
        switch (name) {
            case "band1":
                return bandMock1
            case "band2":
                return bandMock2
            default:
                return undefined
        }
    }

    public async getBandById(id: string): Promise<Band | undefined> {
        switch (id) {
            case "id_band_1":
                return bandMock1
            case "id_band_2":
                return bandMock2
            default:
                return undefined
        }
    }

    public async getAllBands(): Promise<Band[]> {
        return [
            bandMock1, bandMock2
        ]
    }
}