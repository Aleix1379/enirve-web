import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {User} from '../../interfaces/User';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {TokenResponse} from '../../interfaces/TokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = {
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required
      ]
    )
  };

  registerForm = {
    username: new FormControl(
      '',
      [
        Validators.required
      ]
    ),
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required
      ]
    ),
    passwordRepeat: new FormControl(
      '',
      [
        Validators.required
      ]
    ),
    picture: '../../../assets/images/user.png'
  };

  repeatData = {
    username: false,
    email: false
  };

  showLoading = false;
  selectedTab = 0;

  constructor(private userService: UserService,
              private snackBarService: SnackBarService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginForm.email.markAsTouched();
    this.loginForm.password.markAsTouched();

    if (
      this.loginForm.email.hasError('required') ||
      this.loginForm.email.hasError('email') ||
      this.loginForm.password.hasError('required')
    ) {
      this.snackBarService.show('There are error on the form');
    } else {
      this.showLoading = true;
      this.userService.createToken(this.loginForm.email.value, this.loginForm.password.value).subscribe(
        (data: TokenResponse) => {
          this.showLoading = false;
          this.localStorageService.setItem<TokenResponse>('auth-token', data);
          this.router
            .navigateByUrl('/')
            .catch(console.error);
        },
        errorLogin => {
          this.showLoading = false;
          this.snackBarService.show('Incorrect email or password');
          console.log(`ERRROR LOGIN`);
          console.error(errorLogin);
          console.log(`################################################################################`);
        }
      );
    }
  }

  register() {
    const keys = Object.keys(this.registerForm);
    keys.forEach(key => this.registerForm[key].markAsTouched && this.registerForm[key].markAsTouched());

    if (
      this.repeatData.username ||
      this.repeatData.email ||
      this.registerForm.username.hasError('required') ||
      this.registerForm.email.hasError('email') ||
      this.registerForm.email.hasError('required') ||
      this.registerForm.password.hasError('required') ||
      this.registerForm.passwordRepeat.hasError('required') ||
      (this.registerForm.password.value !== this.registerForm.passwordRepeat.value)
    ) {

      const numErrors = this.countErrors();
      let errorMessage: string;
      if (numErrors === 1) {
        errorMessage = 'There is an error on the form';
      } else {
        errorMessage = 'There are errors on the form';
      }
      this.snackBarService.show(errorMessage);
    } else {
      this.showLoading = true;
      let userPicture = 'default.png';
      if (this.registerForm.picture !== '../../../assets/images/user.png') {
        userPicture = this.registerForm.picture;
      }
      const data: User = {
        username: this.registerForm.username.value,
        email: this.registerForm.email.value,
        password: this.registerForm.password.value,
        picture: userPicture
      };

      this.userService.create(data).subscribe(
        () => {
          this.loginForm.email.setValue(this.registerForm.email.value);
          this.resetForm('register');
          this.showLoading = false;

          this.snackBarService.show('Your account has been created successfully').subscribe(
            () => setTimeout(() => this.selectedTab = 0, 100)
          );
        },
        errorCreatingUser => {
          this.showLoading = false;
          console.error(`Error creating user`);
          console.error(errorCreatingUser);
        }
      );
    }
  }

  choosePicture(files: FileList) {
    // const f = evt.target.files[0]; // FileList object
    const fileToUpload: File = files.item(0);
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = ((theFile) => {
      return (e) => {
        this.registerForm.picture = 'data:image/png;base64,' + window.btoa(e.target.result);
      };
    })(fileToUpload);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(fileToUpload);
  }

  inputPassword(field: string) {
    if (this.registerForm[field].value.length > 0) {
      console.log(`touch!!!`);
      this.registerForm[field].markAsTouched();
    }
  }

  checkAvailability(field: string) {
    console.log('checkAvailability');
    setTimeout(() => {
      this.userService.find(field, this.registerForm[field].value).subscribe(
        () => this.repeatData[field] = true,
        () => this.repeatData[field] = false
      );
    }, 100);
  }

  changeTab(index: number) {
    this.selectedTab = index;
  }

  private resetForm(formName: 'login' | 'register') {
    let keys;
    let form;
    if (formName === 'register') {
      keys = Object.keys(this.registerForm);
      form = this.registerForm;
      this.registerForm.picture = '../../../assets/images/user.png';
    } else if (formName === 'login') {
      keys = Object.keys(this.loginForm);
      form = this.loginForm;
    }

    keys.forEach(key => {
      if (form[key].setValue) {
        form[key].setValue('');
      }
      if (form[key].markAsUntouched) {
        form[key].markAsUntouched();
      }
    });
  }

  private countErrors() {
    let count = 0;
    if (this.repeatData.username) {
      count++;
    }
    if (this.repeatData.email) {
      count++;
    }
    if (this.registerForm.username.hasError('required')) {
      count++;
    }
    if (this.registerForm.email.hasError('email')) {
      count++;
    }
    if (this.registerForm.email.hasError('required')) {
      count++;
    }
    if (this.registerForm.password.hasError('required')) {
      count++;
    }
    if (this.registerForm.passwordRepeat.hasError('required')) {
      count++;
    }
    if ((this.registerForm.password.value !== this.registerForm.passwordRepeat.value)) {
      count++;
    }
    return count;
  }

}
