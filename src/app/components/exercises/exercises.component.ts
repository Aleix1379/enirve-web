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
import {EventsService} from '../../services/events/events.service';
import {DeviceService} from '../../services/device/device.service';
import {Config} from '../../interfaces/Config';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';

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
  withoutData = true;
  private readonly config: Config;
  private readonly languages = {
    es: 'Spanish'
  };

  private progress: ProgressCounter = {
    success: 0,
    errors: 0
  };

  translation = new FormControl({value: '', disabled: false});
  pastSimple = new FormControl({value: '', disabled: false});
  pastParticiple = new FormControl({value: '', disabled: false});

  private static verbCheckTranslation(verb: Verb, translation: string, language: string): boolean {
    if (!translation) {
      return false;
    }
    return verb.translations[language] === translation.trim().toLowerCase();
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionService,
              private paramsService: SharedService,
              private verbService: VerbService,
              private dialog: MatDialog,
              private deviceService: DeviceService,
              private eventsService: EventsService,
              private localStorageService: LocalStorageService
  ) {

    this.mistakes = [];
    this.progress = {success: 0, errors: 0};

    this.eventsService.subscribe('activity-section', (data => {

      if (this.progress.success === 0 && this.progress.errors === 0) {
        this.changeSection(data);
      } else {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Change the section',
            subtitle: 'Are you sure?',
            message: 'You will lose all the progress.'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.changeSection(data);
          }
        });
      }

    }));

    this.config = this.localStorageService.getItem<Config>('config');

  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;

    if (
      !this.deviceService.isPhone() &&
      !this.deviceService.isTabPort() &&
      !this.deviceService.isDesktop() &&
      !this.deviceService.isBigDesktop()
    ) {
      // this.withoutData = true;
      this.router.navigateByUrl('/').catch(console.error);
      return;
    }

    this.section = this.sectionService.getSectionById(Number(routeParams.sectionId));
    this.loadData();
  }

  private changeSection(data) {
    this.section = data.section;
    this.loadData();
    this.progress = {success: 0, errors: 0};
    this.formChecked = false;
    this.resetForm();
    this.currentUserIndex = 0;
    this.currentVerb = this.section.verbs[this.currentUserIndex];
  }

  loadData(): void {
    if (!this.section) {
      this.withoutData = true;
    } else {
      this.withoutData = false;
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
        this.mistakes = [];
      }
    }
  }

  check() {
    let resultTranslation = true;
    if (this.isTranslationEnabled()) {
      resultTranslation = ExercisesComponent
        .verbCheckTranslation(this.currentVerb, this.translation.value, this.getTranslationLanguage(true));

      if (!resultTranslation) {
        this.translation.setErrors({incorrect: true});
        this.translation.markAsTouched({onlySelf: true});
      }
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
      this.resetForm();
    }
  }

  private resetForm() {
    this.translation.setValue('');
    this.pastSimple.setValue('');
    this.pastParticiple.setValue('');
  }

  finish() {
    this.paramsService.set('progress', this.progress);
    this.paramsService.set('mistakes', this.mistakes);
    this.paramsService.set('section', this.section);

    this.router
      .navigateByUrl(`/resume`)
      .catch(console.error);
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
      if (result &&
        (
          this.deviceService.isPhone() ||
          this.deviceService.isTabPort() ||
          this.deviceService.isDesktop() ||
          this.deviceService.isBigDesktop()
        )
      ) {
        this.router
          .navigateByUrl(`/`)
          .catch(console.error);
      } else {
        this.section = null;
        this.withoutData = true;
      }
    });
  }

  isTranslationEnabled(): boolean {
    if (!this.config) {
      return false;
    }
    return !!this.config.translateLanguage;
  }

  getTranslationLanguage(lowerCase: boolean = false): string {
    if (!this.config) {
      return null;
    }
    const language: string = this.languages[this.config.translateLanguage];
    if (lowerCase && !!language) {
      return language.toLowerCase();
    }
    return language;
  }

}
