import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PracticeComponent} from './components/practice/practice.component';
import {ExercisesComponent} from './components/exercises/exercises.component';
import {ResumeComponent} from './components/resume/resume.component';
import {LoginComponent} from './components/login/login.component';
import {ForgotYourPasswordComponent} from './components/forgot-your-password/forgot-your-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'practice',
    component: PracticeComponent
  },
  {
    path: 'exercises/:sectionId',
    component: ExercisesComponent
  },
  {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-your-password',
    component: ForgotYourPasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
