import {Pipe, PipeTransform} from '@angular/core';
import {SharedService} from '../../services/shared/shared.service';

@Pipe({
  name: 'serverUrl'
})
export class ServerUrlPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {
  }

  transform(imageName: string, args?: any): any {
    if (imageName.startsWith('../../../assets/images') || imageName.startsWith('data:image')) {
      return imageName;
    }
    return `${this.sharedService.getImageUrl(imageName)}`;
  }

}
