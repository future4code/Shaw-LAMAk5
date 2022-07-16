import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = "lama_shows";

  insertShow = async (id: string, show: Show) => {
    try {
      await this.getConnection()
        .insert({
          id: id,
          band_id: show.getId(),
          week_day: show.getWeek_day(),
          start_time: show.getStart_time(),
          end_time: show.getEnd_time(),
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getAllShow = async () => {
    try {
      const result = await this.getConnection()
        .select("*")
        .into(ShowDatabase.TABLE_NAME);
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getShowDay = async (week_day: string) => {
    try {
      const result = await this.getConnection()
        .select(
          "lama_bandas.name",
          "lama_bandas.music_genre",
          "lama_shows.start_time",
          "lama_shows.end_time"
        )
        .join("lama_shows", "lama_bandas.id", "lama_shows.band_id")
        .where({ week_day })
        .orderBy("start_time")
        .from("lama_bandas");
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
