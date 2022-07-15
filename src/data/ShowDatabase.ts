import { ShowBusiness } from "../business/ShowBusiness";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase{
  private static TABLE_NAME = "lama_shows"


  insertShow = async (id:string, show: Show) => {
    try {
      
      await this.getConnection()
      .insert({
        id: id,
        band_id: show.getId(),
        week_day: show.getWeek_day(),
        start_time: show.getStart_time(),
        end_time: show.getEnd_time()
      })
      .into(ShowDatabase.TABLE_NAME)
      
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}