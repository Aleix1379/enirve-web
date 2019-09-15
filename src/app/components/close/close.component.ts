import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

export type CloseCallback = () => void;

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {
  @Input() onClose: CloseCallback;

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  close() {
    if (this.onClose) {
      this.onClose();
    } else {
      this.location.back();
    }
  }

}
