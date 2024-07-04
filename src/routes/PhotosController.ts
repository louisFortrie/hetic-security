import { exec } from 'child_process';
import { Body, Post, Route } from 'tsoa';

/**
 * Photos des utilisateurs
 */
@Route("/photos")
export class PhotosController {

  /**
   * Lister les photos sur le serveur
   */
  @Post()
  public async listPhotos(
    @Body() body: {
      path?: string;
    }
  ): Promise<{ files: string[] }> {
    return new Promise(
      (resolve, reject) => {
        exec('ls ./assets/' + (body.path || ''), (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            const files = stdout.split('\n').filter(f => !!f);
            resolve({
              files: files
            });
          }
        });
      }      
    )
   
  }
}