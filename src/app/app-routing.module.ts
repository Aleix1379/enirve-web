import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExerciceComponent} from './exercice/exercice-component';
import {HomeComponent} from './home/home.component';
import {PracticeComponent} from './practice/practice.component';
import {ResumeComponent} from './resume/resume.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {IosComponent} from './ios/ios.component';

const routes: Routes = [
  {
    path: 'exercices',
    component: ExerciceComponent
  },
  {
    path: 'practice',
    component: PracticeComponent
  },
  {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'ios',
    component: IosComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: LandingComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
