import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Section} from '../../interfaces/Section';
import {SectionService} from '../../services/section/section.service';
import {Verb} from '../../interfaces/Verb';
import {FormControl} from '@angular/forms';
import {ProgressCounter} from '../../interfaces/ProgressCounter';
import {VerbService} from '../../services/verb/verb.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {SharedService} from '../../services/shared/shared.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  private section: Section;
  private currentVerb: Verb;
  private currentUserIndex = 0;
  private formChecked = false;
  private mistakes: string[] = [];

  private progress: ProgressCounter = {
    success: 0,
    errors: 0
  };

  translation = new FormControl({value: '', disabled: false});
  pastSimple = new FormControl({value: '', disabled: false});
  pastParticiple = new FormControl({value: '', disabled: false});

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionService,
              private paramsService: SharedService,
              private verbService: VerbService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    this.section = this.sectionService.getSectionById(Number(routeParams.sectionId));
    this.currentVerb = this.section.verbs[this.currentUserIndex];

    this.mistakes = this.paramsService.get('mistakes');

    if (!this.mistakes) {
      this.mistakes = [];
    }

    if (this.mistakes.length > 0) {
      this.section.verbs = [];
      this.mistakes.forEach(verbPresent => {
        this.section.verbs.push(this.verbService.getByName(verbPresent));
      });
    }
  }

  check() {
    const resultTranslation = this.verbCheckTranslation(this.currentVerb, this.translation.value, 'spanish');
    if (!resultTranslation) {
      this.translation.setErrors({incorrect: true});
      this.translation.markAsTouched({onlySelf: true});
    }

    const resultPastSimple = this.verbCheckPast(this.currentVerb, this.pastSimple.value, 'simple');
    if (!resultPastSimple) {
      this.pastSimple.setErrors({incorrect: true});
      this.pastSimple.markAsTouched({onlySelf: true});
    }

    const resultPastParticiple = this.verbCheckPast(this.currentVerb, this.pastParticiple.value, 'participle');
    if (!resultPastParticiple) {
      this.pastParticiple.setErrors({incorrect: true});
      this.pastParticiple.markAsTouched({onlySelf: true});
    }

    if (resultTranslation && resultPastSimple && resultPastParticiple) {
      this.progress.success++;
    } else {
      this.progress.errors++;
      this.mistakes.push(this.currentVerb.present);
    }

    this.formChecked = true;

  }

  next() {
    this.formChecked = false;
    if (this.currentUserIndex < this.section.verbs.length - 1) {
      this.currentUserIndex++;
      this.currentVerb = this.section.verbs[this.currentUserIndex];
      this.translation.setValue('');
      this.pastSimple.setValue('');
      this.pastParticiple.setValue('');
    }
  }

  finish() {
    this.paramsService.set('progress', this.progress);
    this.paramsService.set('mistakes', this.mistakes);
    this.paramsService.set('section', this.section);

    this.router
      .navigateByUrl(`/resume`)
      .catch(console.error);
  }

  private verbCheckTranslation(verb: Verb, translation: string, language: string): boolean {
    if (!translation) {
      return false;
    }
    return verb.translations[language] === translation.trim().toLowerCase();
  }


  private verbCheckPast(verb: Verb, value: string, tense: string): boolean {
    if (verb[tense].includes('/')) {
      const values = verb[tense].split('/').map(item => item.trim());
      console.log(values);
      return values[0].toLowerCase() === value.toLowerCase() || values[1].toLowerCase() === value.toLowerCase();
    }

    return verb[tense].toLowerCase() === value.toLowerCase();
  }

  cancelExerciceDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Quit exercise',
        subtitle: 'Are you sure?',
        message: 'You will lose all the progress.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router
          .navigateByUrl(`/`)
          .catch(console.error);
      }
    });
  }

}
