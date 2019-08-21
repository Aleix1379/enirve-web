import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-horizontal-progress-bar',
  templateUrl: './horizontal-progress-bar.component.html',
  styleUrls: ['./horizontal-progress-bar.component.scss']
})
export class HorizontalProgressBarComponent implements OnInit {
  @Input() current: number;
  @Input() total: number;

  constructor() {
  }

  ngOnInit() {
  }

  getProgressPercentage(): number {
    return this.current * 100 / this.total;
  }

}
