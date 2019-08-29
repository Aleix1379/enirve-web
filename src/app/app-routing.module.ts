import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ExercisesComponent} from './components/exercises/exercises.component';
import {ResumeComponent} from './components/resume/resume.component';
import {LoginComponent} from './components/login/login.component';
import {ForgotYourPasswordComponent} from './components/forgot-your-password/forgot-your-password.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LandingComponent} from './components/landing/landing.component';
import {IosComponent} from './components/ios/ios.component';
import {UserSearchComponent} from './components/user-search/user-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    runGuardsAndResolvers: 'always'
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
  },
  {
    path: 'about',
    component: LandingComponent
  },
  {
    path: 'ios',
    component: IosComponent
  },
  {
    path: 'search',
    component: UserSearchComponent
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
