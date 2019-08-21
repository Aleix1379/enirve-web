import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionHeaderComponent} from './section-header/section-header.component';
import {HomeComponent} from './home/home.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {PracticeComponent} from './practice/practice.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {HorizontalProgressBarComponent} from './horizontal-progress-bar/horizontal-progress-bar.component';
import {ResumeComponent} from './resume/resume.component';
import {ProgressCounterComponent} from './progress-counter/progress-counter.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {ForgotYourPasswordComponent} from './forgot-your-password/forgot-your-password.component';
import {PipesModule} from '../pipes/pipes.module';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginRequiredComponent } from './login-required/login-required.component';


@NgModule({
  entryComponents: [
    ConfirmDialogComponent,
    SnackBarComponent
  ],
  declarations: [
    HomeComponent,
    SectionHeaderComponent,
    PracticeComponent,
    ExercisesComponent,
    HorizontalProgressBarComponent,
    ResumeComponent,
    ProgressCounterComponent,
    ConfirmDialogComponent,
    LoginComponent,
    ForgotYourPasswordComponent,
    SnackBarComponent,
    LoadingComponent,
    LoginRequiredComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    PipesModule,
    ReactiveFormsModule,
    RoundProgressModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    SectionHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}
