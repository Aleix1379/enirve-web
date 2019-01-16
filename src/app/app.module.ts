import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ExerciceComponent} from './exercice/exercice-component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {PracticeComponent} from './practice/practice.component';
import {ResumeComponent} from './resume/resume.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {SecondsToTimePipe} from './seconds-to-time.pipe';
import {FooterComponent} from './footer/footer.component';
import {MobileComponent} from './mobile/mobile.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {TokenService} from './token.service';
import {CommonService} from './common.service';
import { LandingComponent } from './landing/landing.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExerciceComponent,
    HeaderComponent,
    PracticeComponent,
    ResumeComponent,
    SecondsToTimePipe,
    FooterComponent,
    MobileComponent,
    LoginComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      'radius': 60,
      'space': -10,
      'outerStrokeWidth': 10,
      'innerStrokeColor': '#e7e8ea',
      'innerStrokeWidth': 10,
      'title': '',
      'animateTitle': true,
      'animationDuration': 1000,
      'showUnits': true,
      'showBackground': false,
      'clockwise': true
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressBarModule,
    SlideshowModule,
    MatTabsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    TokenService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
