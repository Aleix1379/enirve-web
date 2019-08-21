import {Component, OnInit} from '@angular/core';
import {ProgressCounter} from '../../interfaces/ProgressCounter';
import {Section} from '../../interfaces/Section';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared/shared.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  private section: Section;
  private mistakes: string[] = [];
  private progress: ProgressCounter = null;
  private points = 0;

  constructor(private router: Router,
              private paramsService: SharedService) {
  }

  ngOnInit() {
    this.progress = this.paramsService.get('progress');
    this.mistakes = this.paramsService.get('mistakes');
    this.section = this.paramsService.get('section');

    if (!this.progress) {
      this.router
        .navigateByUrl('/')
        .catch(console.error);
    }

    this.points = this.progress.success * 10;
  }


  getCurrent() {
    return this.progress.success;
  }

  getMax() {
    return this.progress.success + this.progress.errors;
  }

  repeatWrongVerbs() {
    this.paramsService.set('mistakes', this.mistakes);
    this.router
      .navigateByUrl(`/exercises/${this.section.id}`)
      .catch(console.error);
  }

  finish() {
    this.router
      .navigateByUrl(`/`)
      .catch(console.error);
  }

}
