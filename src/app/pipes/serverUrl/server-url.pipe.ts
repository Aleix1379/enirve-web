import {Pipe, PipeTransform} from '@angular/core';
import {SharedService} from '../../services/shared/shared.service';

@Pipe({
  name: 'serverUrl'
})
export class ServerUrlPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {
  }

  transform(imageName: any, args?: any): any {
    return `${this.sharedService.getImageUrl(imageName)}`;
  }

}
