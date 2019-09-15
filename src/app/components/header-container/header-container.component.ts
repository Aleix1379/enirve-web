import {Component, Input, OnInit} from '@angular/core';
import {CloseCallback} from '../close/close.component';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {
  @Input() title = '';
  @Input() showClose = false;
  @Input() onSearch: any;
  @Input() onClose: CloseCallback;

  constructor() {
  }

  ngOnInit() {
    if (this.onClose) {
      this.showClose = true;
    }
  }

}
