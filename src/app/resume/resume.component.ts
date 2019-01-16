import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Score} from '../interfaces/score';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['../app.component.css', './resume.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeComponent implements OnInit {

  data: any;
  score: Score;
  percentage: number;
  faceResult: string;
  color: string;

  constructor(public router: Router) {
    this.data = this.router.getNavigatedData();

    if (this.data) {
      this.score = this.data['score'];
      this.percentage = Math.floor(this.score.success * 100 / this.score.total);
      this.loadColorResult(this.percentage);
    } else {
      this.goToHome();
    }
  }

  goToHome() {
    this.router.navigate(['/'])
      .then(data => console.log({'data': data}))
      .catch(error => console.log({'error': error}));
  }

  ngOnInit() {
  }

  loadColorResult(value): void {
    if (value <= 25) {
      this.faceResult = '😩';
      this.color = '#f44336';
    } else if (value <= 50) {
      this.faceResult = '😐';
      this.color = '#ffc107';
    } else if (value <= 75) {
      this.faceResult = '😁';
      this.color = '#ffeb3b';
    } else if (value < 100) {
      this.faceResult = '🤓';
      this.color = '#cddc39';
    } else if (value === 100) {
      this.faceResult = '🤩';
      this.color = '#4caf50';
    }
  }

}
