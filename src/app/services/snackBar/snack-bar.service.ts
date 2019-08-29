import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss} from '@angular/material';
import {SharedService} from '../shared/shared.service';
import {SnackBarComponent} from '../../components/snack-bar/snack-bar.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top'
  };

  constructor(private snackBar: MatSnackBar,
              private sharedService: SharedService) {
  }

  public show(message: string, config: MatSnackBarConfig = {}): Observable<MatSnackBarDismiss> {
    this.sharedService.set('message-snackbar', message);

    return this.snackBar
      .openFromComponent(SnackBarComponent, {
        duration: config.duration ? config.duration : this.defaultConfig.duration,
        verticalPosition: config.verticalPosition ? config.verticalPosition : this.defaultConfig.verticalPosition
      })
      .afterDismissed();
  }

}
