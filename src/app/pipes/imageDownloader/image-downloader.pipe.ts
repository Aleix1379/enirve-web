import {Pipe, PipeTransform} from '@angular/core';
import {ImageService} from '../../services/image/image.service';

@Pipe({
  name: 'imageDownloader'
})
export class ImageDownloaderPipe implements PipeTransform {

  constructor(private imageService: ImageService) {
  }

  async transform(imageName: any, args?: any): Promise<string> {
    if (imageName !== null) {
      return await this.imageService.downloadImage(imageName);
    }
  }

}
