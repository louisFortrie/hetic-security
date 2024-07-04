import { RowDataPacket } from 'mysql2';
import { Body, Post, Route } from 'tsoa';
import { DB } from '../utility/DB';


/**
 * Un annonceur
 */
@Route("/advertiser")
export class AdvertiserController {

  /**
   * Récupérer une page d'annonceurs
   */
  @Post()
  public async getAdvertisers(
    @Body() body: {
      columns: string[];
      name?: string;
    }
  ): Promise<any> {
    
    const db = DB.Connection;

    let sql = 'select ' + body.columns.join(', ') + ' from advertiser';
    if (body.name) {
      sql += ' where name = "' + body.name + '"';
    }
    console.log(sql);

    const data = await db.query<RowDataPacket[]>(sql);
    
    return data[0];    

  }

  

}