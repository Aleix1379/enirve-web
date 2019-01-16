import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {Verb} from '../interfaces/verb-interface';
import {MatSnackBar} from '@angular/material';
import {ModeSelect, ValueModeSelect} from '../interfaces/mode-select';
import {Router} from '@angular/router';
import {VerbService} from '../verb.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  verbs: Verb[];
  verbsSelected: Verb[] = [];
  verbsFiltered: Verb[] = [];
  modesSelection: ModeSelect[] = [];
  modeSelection: ModeSelect;

  innerHeight: any;
  numberOfVerbsRandomSelected: number;
  randomCurrentIndex = 0;

  constructor(public snackBar: MatSnackBar, public router: Router) {
    this.setMaxHeight();

    this.verbsFiltered = this.verbs = VerbService.getAllVerbs();
    // this.modesSelection = [
    //   {value: ValueModeSelection.Manual, text: 'Manual'},
    //   {value: ValueModeSelection.All, text: 'All'},
    //   {value: ValueModeSelection.RandomByTime, text: 'Random (limited by time)'},
    //   {value: ValueModeSelection.RandomByNumber, text: 'Random (limited by number of verbs)'}
    // ];
    this.modesSelection.push({value: ValueModeSelect.Manual, text: 'Manual'});
    this.modesSelection.push({value: ValueModeSelect.Random, text: 'Random'});
    this.modesSelection.push({value: ValueModeSelect.All, text: 'All'});
    this.modeSelection = this.modesSelection[0];

    // this.modesPractice.push({value: ValueModeSelect.Sort, text: 'Sorted'});
    // this.modesPractice.push({value: ValueModeSelect.Random, text: 'Random'});
    // this.modePractice = this.modesPractice[0];

    // this.modesDuration.push({value: ValueModeSelect.ByTime, text: 'By time'});
    // this.modesDuration.push({value: ValueModeSelect.ByNumber, text: 'By number'});
    // this.modeDuration = this.modesDuration[0];
  }

  public selectVerb(verb: Verb): void {
    if (this.modeSelection.value === ValueModeSelect.Manual) {
      verb.matched = !verb.matched;
      if (verb.matched) {
        this.verbsSelected.push(verb);
      } else {
        this.verbsSelected = this.verbsSelected.filter(v => v.id !== verb.id);
      }
    }
  }

  public changeModeSelect(): void {
    if (this.modeSelection.value === 1) {
      this.setMatched(false);
    } else if (this.modeSelection.value === 2 || this.modeSelection.value === 3) {
      this.setMatched(true);
    } else if (this.modeSelection.value === 4) {
      this.refreshVerbsRandom();
    }
  }

  private setMatched(newValue: boolean): void {
    this.verbsFiltered.forEach(v => v.matched = newValue);
    this.verbsSelected = newValue ? this.verbs : [];
  }

  public isModeSelected(modeSelect: ModeSelect, ...modes: string[]): boolean {
    return modes.some(mode => modeSelect.value === ValueModeSelect[mode]);
  }

  public search(text: string) {
    this.verbsFiltered = this.verbs.filter(v => v.verb.toLowerCase().includes(text.trim().toLowerCase()));
  }

  public selectModeExercices() {
    if (this.verbsSelected.length <= 0) {
      this.snackBar.open('To continue before you have to select at least one verb', null, {
        verticalPosition: 'top',
        duration: 5000,
      });
    } else {
      this.router.navigate(['exercices'], {
        queryParams: {
          verb: this.verbsSelected.map(v => v.id)
        }
      })
        .then(data => console.log({'data': data}))
        .catch(error => console.log({'error': error}));
    }
  }

  setMaxHeight(): any {
    this.innerHeight = (window.innerHeight - 305) + 'px';
  }

  refreshVerbsRandom(): void {
    // const vs: Verb[] = JSON.parse(JSON.stringify(this.verbs));
    this.randomCurrentIndex = 0;
    let index: number;
    this.verbsSelected = [];
    this.verbs.forEach(v => v.matched = false);
    const max = this.numberOfVerbsRandomSelected > this.verbs.length ? this.verbs.length : this.numberOfVerbsRandomSelected;
    const positions = this.getPositions(max);
    for (let i = 0; i < max; i++) {
      // index = Math.floor(Math.random() * vs.length);
      index = positions[this.randomCurrentIndex++];
      this.verbs[index].matched = true;
      this.verbsSelected.push(this.verbs[index]);
      // positions.splice(index, 1);
      // vs.splice(index, 1);
    }
  }

  getPositions(max: number): number[] {
    const allPositions: number[] = [];
    const positions: number[] = [];
    let index: number;

    for (let i = 0; i < this.verbs.length; i++) {
      allPositions.push(i);
    }

    for (let i = 0; i < max; i++) {
      index = Math.floor(Math.random() * allPositions.length);
      positions.push(allPositions[index]);
      allPositions.splice(index, 1);
    }
    return positions;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setMaxHeight();
  }

}
