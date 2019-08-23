import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  public async downloadImage(imageName: string): Promise<string> {
    const url = `${this.sharedService.getImagesUrl()}/${imageName}`;
    const data = await this.http.get(url, {responseType: 'blob'}).toPromise();
    const base64 = await this.createImageFromBlob(data);
    return base64.toString();

  }

  private createImageFromBlob(image: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
    });
  }

}
