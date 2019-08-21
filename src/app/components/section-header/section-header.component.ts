import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  current: number;
  @Input()
  max: number;

  constructor() {
  }

  ngOnInit() {
  }

  getProgressPercentage(): number {
    return this.current * 100 / this.max;
  }

  getProgress(): string {
    const percentage = this.getProgressPercentage();
    if (percentage >= 75) {
      return 'header-section__progress--gold';
    }
    if (percentage >= 50 && percentage < 75) {
      return 'header-section__progress--silver';
    }
    if (percentage >= 25 && percentage < 50) {
      return 'header-section__progress--bronze';
    }
  }

}
