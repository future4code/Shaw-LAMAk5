import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
    ) {}

  createShow = async (token: string, newShow: ShowInputDTO) => {
    const { band_id, week_day, start_time, end_time } = newShow;
    if (!token || !band_id || !week_day || !start_time || !end_time) {
      throw new Error("Todos os campos precisam ser preenchidos");
    }

    const userTokenData = this.authenticator.getData(token);
    if (!userTokenData) {
      throw new Error("Token inválido");
    }

    //verificando horario
    if (start_time < 8 || start_time > 22) {
      throw new Error("Horario de inicio inválido");
    }
    if (end_time <= 9 || end_time >= 23) {
      throw new Error("Horario final inválido");
    }
    if (start_time > end_time) {
      throw new Error("Horario inválidos");
    }

    const id = this.idGenerator.generate();       
    console.log(id)

    const insertShow =  Show.toShowModel(newShow)
    // console.log(insertShow)

    await this.showDatabase.insertShow(id, insertShow)
    
    return "Show criado";
  };
}
