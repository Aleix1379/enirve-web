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
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule, MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule, MatToolbarModule
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
import {LoadingComponent} from './loading/loading.component';
import {LoginRequiredComponent} from './login-required/login-required.component';
import {ProfileComponent} from './profile/profile.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LandingComponent} from './landing/landing.component';
import {IosComponent} from './ios/ios.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { UserSearchComponent } from './user-search/user-search.component';
import {FriendsComponent} from './friends/friends.component';
import { CloseComponent } from './close/close.component';

@NgModule({
  entryComponents: [
    ConfirmDialogComponent,
    SnackBarComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    ExercisesComponent,
    FooterComponent,
    ForgotYourPasswordComponent,
    HeaderComponent,
    HomeComponent,
    HorizontalProgressBarComponent,
    IosComponent,
    LandingComponent,
    LoadingComponent,
    LoginComponent,
    LoginRequiredComponent,
    PracticeComponent,
    ProfileComponent,
    ProgressCounterComponent,
    ResumeComponent,
    SectionHeaderComponent,
    SnackBarComponent,
    UserSearchComponent,
    FriendsComponent,
    CloseComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatToolbarModule,
    PipesModule,
    RoundProgressModule,
    FormsModule,
    RouterModule,
    SlideshowModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    SectionHeaderComponent,
    FooterComponent,
    HeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}
