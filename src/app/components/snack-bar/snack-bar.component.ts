import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared/shared.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  message: string;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.message = this.sharedService.get('message-snackbar');
  }

}
