import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenService} from '../token.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  selectedPageIndex = 0;
  loginForm = {
    email: '',
    password: ''
  };

  registerForm = {
    name: '',
    email: '',
    password1: '',
    password2: '',
  };

  showLoading = false;

  constructor(private tokenService: TokenService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const mode = params['mode'];
      console.log(`Mode: ${mode}`);
      if (mode === 'signup') {
        this.selectedPageIndex = 1;
      }
    });
  }

  login(): void {
    this.showLoading = true;
    this.tokenService.createToken(this.loginForm)
      .subscribe(
        (data) => {
          // alert('login correcte');
          console.log(data);
          this.showLoading = false;
        },
        (error) => {
          console.error(error);
          // alert('login incorrecte');
          this.showLoading = false;
        }
      );
  }

  register(): void {
    console.log('register');
    console.log(this.registerForm);
  }

}
