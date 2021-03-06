import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    if (items) {
      return items.sort((a, b) =>
        a.progress.points > b.progress.points ? -1 : a.progress.points < b.progress.points ? 1 : 0
      );
    }
  }

}
