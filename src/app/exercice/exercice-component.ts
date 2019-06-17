import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Verb} from '../interfaces/Verb-interface';
import {VerbService} from '../verb.service';
import {ModeSelect, ValueModeSort, ValueModeType} from '../interfaces/Mode-select';
import 'angular2-navigate-with-data';

@Component({
  templateUrl: './exercice-component.html',
  styleUrls: ['../app.component.css', './exercice-component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciceComponent {

  verbs: Verb[] = [];

  modesSort: ModeSelect[] = [];
  modeSort: ModeSelect;

  modesType: ModeSelect[] = [];
  modeType: ModeSelect;

  labelDuration: string;
  duration = 1;

  paramIdsVerbs: any;

  constructor(private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.paramIdsVerbs = params['verb'];
      this.verbs = VerbService.getVerbsById(params['verb']);
    });

    this.modesSort.push({value: ValueModeSort.Sort, text: 'Sorted'});
    this.modesSort.push({value: ValueModeSort.Random, text: 'Random'});
    this.modeSort = this.modesSort[0];

    this.modesType.push({value: ValueModeType.ByNumber, text: 'By Number of repetitions'});
    this.modesType.push({value: ValueModeType.ByTime, text: 'By time'});
    this.modeType = this.modesType[0];

    this.changeDuration();
  }


  changeDuration(): void {
    if (this.modeType.value === ValueModeType.ByNumber) {
      this.labelDuration = 'Number of repetitions for each verb';
    } else if (this.modeType.value === ValueModeType.ByTime) {
      this.labelDuration = 'Duration of the exercise (minutes)';
    }
  }

  startExercices(): void {
    this.router.navigateByData({
      url: ['practice'],
      data: {
        verbs: this.paramIdsVerbs,
        sort: this.modeSort,
        durationType: this.modeType,
        durationValue: this.duration
      }
    })
      .then(data => console.log({'data': data}))
      .catch(error => console.log({'error': error}));
  }

  changeOrderVerbs(): void {
    const verbsAux: Verb[] = JSON.parse(JSON.stringify(this.verbs));
    const verbsOrderRandom: Verb[] = [];
    let index: number;
    const max = verbsAux.length;
    if (this.modeSort.value === ValueModeSort.Sort) {
      this.verbs = this.verbs.sort((a, b) => a.verb.localeCompare(b.verb));
    } else if (this.modeSort.value === ValueModeSort.Random) {
      for (let i = 0; i < max; i++) {
        index = Math.floor(Math.random() * verbsAux.length);
        verbsOrderRandom.push(verbsAux[index]);
        verbsAux.splice(index, 1);
      }
      this.verbs = verbsOrderRandom;
    }
  }

  goToHome(): void {
    this.router.navigate([''])
      .then(data => console.log({'data': data}))
      .catch(error => console.log({'error': error}));
  }


}
