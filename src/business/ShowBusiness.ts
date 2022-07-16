import { ShowDatabase } from "../data/ShowDatabase";
import { Show, showDayInputDTO, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
    ) {}

    checkShow = async () => {
      return await this.showDatabase.getAllShow()
    }

  createShow = async (token: string, newShow: ShowInputDTO) => {
    const { band_id, week_day, start_time, end_time } = newShow;
    if (!token || !band_id || !week_day || !start_time || !end_time) {
      throw new Error("Todos os campos precisam ser preenchidos");
    }

    if (week_day.toUpperCase() !== "SEXTA" && week_day.toUpperCase() != "SABADO" && week_day.toUpperCase() != "DOMINGO") {
      throw new Error("Escolha entre Sexta, Sábado e Domingo");
    }

    const authorization = this.authenticator.getData(token);
    if (!authorization) {
      throw new Error("Token inválido");
    }

    //verificando horario
    if (start_time < 8 || start_time > 22) {
      throw new Error("Horario de inicio inválido");
    }
    if (end_time < 9 || end_time > 23) {
      throw new Error("Horario final inválido");
    }
    if (start_time >= end_time) {
      throw new Error("Horario inválidos");
    }

    // verificar se já tem show no mesmo horario 
    const checkShow = await this.checkShow()
    checkShow.map((show) => {
      if(week_day === show.week_day && start_time === show.start_time){
        throw new Error("Já existe show para o mesmo período");
      }
    })
  
    const id = this.idGenerator.generate();       

    const showData = Show.toShowModel(newShow)


    await this.showDatabase.insertShow(id, showData)
    
    return "Show criado";
  };

  verifyDay = async (day:showDayInputDTO) => {
    const {token, week_day} = day

    if (!token || !week_day) {
      throw new Error("Todos os campos precisam ser preenchidos");
    }

    
    const authorization = this.authenticator.getData(token);
    if (!authorization) {
      throw new Error("Token inválido");
    }

    const result = await this.showDatabase.getShowDay(week_day)



    return result
  }
}
