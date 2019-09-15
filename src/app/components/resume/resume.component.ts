import {Component, OnInit} from '@angular/core';
import {ProgressCounter} from '../../interfaces/ProgressCounter';
import {Section} from '../../interfaces/Section';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared/shared.service';
import {UserService} from '../../services/user/user.service';
import {ActivityUpdateProgress, ActivityUpdateProgressVerbs} from '../../interfaces/User';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Token} from '../../interfaces/Token';
import {DeviceService} from '../../services/device/device.service';
import {EventsService} from '../../services/events/events.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  private section: Section;
  mistakes: string[] = [];
  progress: ProgressCounter;
  points = 0;
  private token: Token;

  constructor(private router: Router,
              private paramsService: SharedService,
              private userService: UserService,
              private snackBarService: SnackBarService,
              private localStorageService: LocalStorageService,
              private deviceService: DeviceService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.progress = this.paramsService.get('progress');
    this.mistakes = this.paramsService.get('mistakes');
    this.section = this.paramsService.get('section');
    this.token = this.localStorageService.getAuthToken();

    if (!this.progress) {
      return this.router
        .navigateByUrl('/')
        .catch(console.error);
    }

    this.points = this.progress.success * 10;

    if (this.points > 0 && this.token) {
      this.updateProgress();
    } else {
      console.log(`no user or no points`);
    }
  }

  private updateProgress() {
    const data: ActivityUpdateProgress = {
      points: this.points,
      activity: this.getIdsVerbsCorrect()
    };

    this.userService.updateProgress(data, this.token.userCode).subscribe(
      () => this.snackBarService.show('The progress has been saved'),
      error => {
        this.snackBarService.show('Error updating the progress');
        console.log(`error updating the progress...`);
        console.log(error);
      });
  }

  private getIdsVerbsCorrect(): ActivityUpdateProgressVerbs {
    const ids: number[] = [];
    this.section.verbs.forEach(verb => {
      if (this.mistakes.findIndex(mistake => mistake === verb.present) === -1) {
        ids.push(verb.id);
      }
    });

    return {
      sectionId: this.section.id,
      verbs: ids
    };
  }

  getCurrent() {
    return this.progress.success;
  }

  getMax() {
    return this.progress.success + this.progress.errors;
  }

  repeatWrongVerbs() {
    this.paramsService.set('mistakes', this.mistakes);
    this.mistakes = [];
    if (this.deviceService.isPhone() || this.deviceService.isTabPort()) {
      this.router
        .navigateByUrl(`/exercises/${this.section.id}`)
        .catch(console.error);
    } else {
      this.router
        .navigateByUrl(`/`)
        .then(() => this.eventsService.publish('activity-repeat', {section: this.section}))
        .catch(console.error);
    }
  }

  finish() {
    this.router
      .navigateByUrl(`/`)
      .catch(console.error);
  }

}
