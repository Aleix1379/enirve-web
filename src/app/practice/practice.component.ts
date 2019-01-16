import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Verb} from '../interfaces/verb-interface';
import {ModeSelect, ValueModeSort, ValueModeType} from '../interfaces/mode-select';
import {VerbService} from '../verb.service';
import {Score} from '../interfaces/score';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  verbs: Verb[];
  verbSelected: Verb;
  newVerb: Verb;
  sort: ModeSelect;
  durationType: ModeSelect;
  durationValue: number;

  step = 0;
  seconds: number;
  secondsPercentage = 100;
  readonly secondsTotal: number;

  data: any;

  isVerbChecked = false;
  exerciceCorrect: any;

  percentage = 0;
  isExerciceFinished = false;
  score: Score;

  color = '#4caf50';

  observableVar: Subscription;

  @ViewChild('inputSimple') inputSimple: ElementRef;
  @ViewChild('btnNext') btnNext: ElementRef;

  constructor(public router: Router) {

    this.data = this.router.getNavigatedData();

    if (!this.data) {
      this.router.navigate([''])
        .then(data => console.log({'data': data}))
        .catch(error => console.log({'error': error}));
    } else {
      this.verbs = VerbService.getVerbsById(this.data['verbs']);
      this.sort = this.data['sort'];
      if (this.sort.value === ValueModeSort.Random) {
        this.verbs = this.randomVerbs();
      }
      this.verbSelected = this.verbs[0];
      this.durationType = this.data['durationType'];
      this.durationValue = this.data['durationValue'];
      if (this.durationType.value === ValueModeType.ByNumber) {
        this.verbs = PracticeComponent.duplicateVerbs(this.verbs, this.durationValue);
      } else if (this.durationType.value === ValueModeType.ByTime) {
        this.secondsTotal = PracticeComponent.convertToSeconds(this.durationValue);
        this.seconds = PracticeComponent.convertToSeconds(this.durationValue);

        this.observableVar = Observable.interval(1000).subscribe(() => {
          if (this.seconds === 0) {
            this.stopInterval();
          } else {
            this.seconds--;
            this.secondsPercentage = this.getPercentageSeconds();
            this.setColorCircleProgress();
          }
        });

      }
      this.score = {
        success: 0,
        errors: 0,
        total: 0
      };
      this.initForm();
    }
  }

  static duplicateVerbs(verbs: Verb[], num: Number): Verb[] {
    let vs: Verb[] = [];
    for (let i = 0; i < num; i++) {
      vs = vs.concat(verbs);
    }
    return vs;
  }

  static convertToSeconds(minutes): number {
    return minutes * 60;
  }

  private static compareVerb(newVerb, verbSelected): boolean {
    newVerb = newVerb.trim();
    verbSelected = verbSelected.trim();
    newVerb = newVerb.toLowerCase();
    if (newVerb === '') {
      return false;
    }
    verbSelected = verbSelected.toLowerCase();
    return verbSelected.includes('/') ? verbSelected.split('/').some(v => v.trim() === newVerb) : newVerb === verbSelected;
  }

  static focusInput(input: ElementRef) {
    if (input) {
      console.log('focus');
      input.nativeElement.focus();
    } else {
      console.log('input null');
    }
  }

  ngOnInit() {
    PracticeComponent.focusInput(this.inputSimple);
  }

  checkVerb(): void {
    this.isVerbChecked = true;
    this.exerciceCorrect.simple = PracticeComponent.compareVerb(this.newVerb.simple, this.verbSelected.simple);
    this.exerciceCorrect.participle = PracticeComponent.compareVerb(this.newVerb.participle, this.verbSelected.participle);
    if (this.exerciceCorrect.simple && this.exerciceCorrect.participle) {
      this.score.success++;
    } else {
      this.score.errors++;
    }
    this.score.total++;
    this.step++;
    if (this.durationType.value === ValueModeType.ByNumber) {
      if (this.step === this.verbs.length) {
        this.isExerciceFinished = true;
      }
      this.calculatePercentage();
    } else if (this.durationType.value === ValueModeType.ByTime) {
      if (this.seconds === 0) {
        this.isExerciceFinished = true;
      }
    }
    PracticeComponent.focusInput(this.btnNext);
  }

  nextVerb(): void {
    if (this.durationType.value === ValueModeType.ByNumber) {
      if (this.step < this.verbs.length) {
        this.verbSelected = this.verbs[this.step];
        this.isVerbChecked = false;
        this.initForm();
      } else {
        this.goToResume();
      }
    } else if (this.durationType.value === ValueModeType.ByTime) {
      if (this.seconds > 0) {
        this.verbSelected = this.verbs[this.step % this.verbs.length];
        this.isVerbChecked = false;
        this.initForm();
      } else {
        this.goToResume();
      }
    }
  }

  private goToResume(): void {
    this.router.navigateByData({
      url: ['resume'],
      data: {
        score: this.score
      }
    })
      .then(data => console.log({'data': data}))
      .catch(error => console.log({'error': error}));
  }

  calculatePercentage(): void {
    this.percentage = Math.floor(this.step * 100 / this.verbs.length);
  }

  initForm(): void {
    this.exerciceCorrect = {
      simple: false,
      participle: false
    };

    this.newVerb = {
      id: this.verbSelected.id,
      verb: this.verbSelected.verb,
      simple: '',
      participle: '',
      matched: false
    };
    PracticeComponent.focusInput(this.inputSimple);
  }

  setColorCircleProgress(): void {
    if (this.secondsPercentage <= 25) {
      this.color = '#f44336';
    } else if (this.secondsPercentage <= 50) {
      this.color = '#ffc107';
    } else if (this.secondsPercentage <= 75) {
      this.color = '#ffeb3b';
    } else if (this.secondsPercentage <= 100) {
      this.color = '#4caf50';
    }
  }

  private getPercentageSeconds() {
    return Math.floor(this.seconds * 100 / this.secondsTotal);
  }

  private stopInterval() {
    this.observableVar.unsubscribe();
    this.observableVar = null;
  }

  private randomVerbs(): Verb[] {
    const verbsAux: Verb[] = JSON.parse(JSON.stringify(this.verbs));
    const vs = [];
    let index;
    const max = verbsAux.length;
    for (let i = 0; i < max; i++) {
      index = Math.floor(Math.random() * verbsAux.length);
      vs.push(verbsAux[index]);
      verbsAux.splice(index, 1);
    }
    return vs;
  }
}
