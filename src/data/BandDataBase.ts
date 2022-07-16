import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_bandas";

  public createBand = async (
    id: string,
    name: string,
    music_genre: string,
    responsible: string,
  ): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible  
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getBandByName = async (name: string): Promise<Band | undefined>  => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ name });

        if(result[0]){
          return Band.toBandModel(result[0]);
        }else{
          return undefined
        }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}