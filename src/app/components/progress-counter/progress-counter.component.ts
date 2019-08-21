import {Component, Input, OnInit} from '@angular/core';
import {ProgressCounter} from '../../interfaces/ProgressCounter';

@Component({
  selector: 'app-progress-counter',
  templateUrl: './progress-counter.component.html',
  styleUrls: ['./progress-counter.component.scss']
})
export class ProgressCounterComponent implements OnInit {
  @Input() progress: ProgressCounter;
  constructor() { }

  ngOnInit() {
  }

}
