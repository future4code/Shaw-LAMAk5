import { BandBusiness } from "../src/business/BandBusiness";
import { BandInputDTO } from "../src/model/Band";
import { BandDatabaseMock } from "./mocks/bandDataBaseMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock";
import { AuthenticationData } from "../src/services/Authenticator";

const bandBusinessMock = new BandBusiness(
    new BandDatabaseMock() as any,
    new IdGeneratorMock() as any,
    new TokenGeneratorMock() as any,
)

const band: BandInputDTO = {
    name: "",
    music_genre: "RAP",
    responsible: "Mano Brown"
}

const band1: BandInputDTO = {
    name: "Charlie Brown",
    music_genre: "Rock",
    responsible: "Chorão",
}

const user1: AuthenticationData = {
    id: "016348272917",
    role: "NORMAL"
}
const user2: AuthenticationData = {
    id: "0163482729170",
    role: "ADMIN"
}

const generator = new TokenGeneratorMock()
const token1 = generator.generate(user1)
const token2 = generator.generate(user2)

describe("Testando o newBand", () => {
    test("Deve retornar erro quando o nome está vazio", async () => {
        try {

            await bandBusinessMock.createBand(band, token2)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid fields")
            expect(error.code).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Sucesso ao criar banda", async () => {
        try {
            const successMesage = await bandBusinessMock.createBand(band1, token2)
            expect(successMesage).toEqual("Successfully registered band")
        } catch (error) {
            console.log(error);                
        }
    })

    const bandName: string = ""

    const bandName1: string = "Renan"

    describe("Testando getBand", () => {
        test("Deve retornar erro quando o nome fornecido esta vazio", async () => {
            try {
                await bandBusinessMock.getBandByName(bandName, token2)
            } catch (error: any) {
                expect(error.message).toEqual("Enter the name of the desired band")
                expect(error.code).toBe(422)
            } finally {
                expect.assertions(2)
            }
        })

        test("Sucesso na busca", async () => {
            try {
                const successMesage = await bandBusinessMock.getBandByName(bandName1, token2)
                expect(successMesage).toEqual("Band information")
            } catch (error) {
                console.log(error);                
            }
        })
    })
})