import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort((a, b) =>
      a.progress.points > b.progress.points ? -1 : a.progress.points < b.progress.points ? 1 : 0
    );
  }

}
