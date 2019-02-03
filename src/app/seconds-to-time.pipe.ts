import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the SecondsToTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'secondsToTime',
})
export class SecondsToTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    const time = Number(value);
    const hours = (Math.floor(time / 3600));
    const minutes = (Math.floor((time - hours * 3600) / 60));
    const seconds = (time - hours * 3600 - minutes * 60);

    let strHours = hours.toString();
    let strMinutes = minutes.toString();
    let strSeconds = seconds.toString();

    if (hours < 10) {
      strHours = '0' + hours;
    }
    if (minutes < 10) {
      strMinutes = '0' + minutes;
    }
    if (seconds < 10) {
      strSeconds = '0' + seconds;
    } else if (seconds === 0) {
      strSeconds = '0';
    }

    if (time < 60) {
      return strSeconds;
    } else if (time < 3600) {
      return strMinutes + ':' + strSeconds;
    }
    return strHours + ':' + strMinutes + ':' + strSeconds;
  }
}
