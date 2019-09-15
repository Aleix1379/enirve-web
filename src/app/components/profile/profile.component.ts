import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {ConfigService} from '../../services/config/config.service';
import {UserService} from '../../services/user/user.service';
import {Token} from '../../interfaces/Token';
import {Config} from '../../interfaces/Config';
import {User} from '../../interfaces/User';
import {FormControl, Validators} from '@angular/forms';
import {EventsService} from '../../services/events/events.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showLoginRequired = false;
  userConnected: User;
  userProfile: User;
  selectedTab = 0;
  token: Token;
  config: Config = {
    userCode: null,
    translateLanguage: null
  };

  languages = [
    {
      code: 'es',
      label: 'Spanish'
    }
  ];

  translationEnabled: boolean;
  username: string;
  following = false;
  showLoading = false;
  finishDownload = false;

  registerForm = {
    username: new FormControl(''),
    email: new FormControl(
      '',
      [
        Validators.email
      ]
    ),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
    picture: '../../../assets/images/user.png'
  };

  repeatData = {
    username: false,
    email: false
  };

  readMode = true;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private configService: ConfigService,
    private snackBarService: SnackBarService,
    private router: Router,
    private eventsService: EventsService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit() {
    console.log(`ng on init`);
    this.username = this.router.url.split('/')[2];
    this.finishDownload = false;
    this.token = this.localStorageService.getAuthToken();
    if (!this.token) {
      this.showLoginRequired = true;
      this.finishDownload = true;
    } else {
      this.showLoginRequired = false;
      this.config = this.localStorageService.getConfig();
      this.translationEnabled = !!this.config.translateLanguage;

      const userConnectedPromise = this.userService.findByCode(this.token.userCode).toPromise();
      const userProfilePromise = this.userService.find('username', this.username).toPromise();

      this.showLoading = true;
      Promise.all([userConnectedPromise, userProfilePromise])
        .then(result => {
          this.finishDownload = true;
          this.showLoading = false;
          this.userConnected = result[0];
          this.userProfile = result[1];
          this.initUserForm();
          this.updateIsFollowing();
        })
        .catch(error => {
          this.showLoading = false;
          this.finishDownload = true;
          console.error('error downloading user data');
          console.error(error);
        });
    }
  }

  private updateIsFollowing() {
    this.following = this.userConnected.friends.findIndex(friend => friend === this.userProfile.code) >= 0;
  }

  changeTab(index: number) {
    this.selectedTab = index;
  }

  translationEnabledToggle() {
    this.translationEnabled = !this.translationEnabled;
    if (!this.translationEnabled) {
      this.config.translateLanguage = null;
      this.updateConfiguration();
    }
  }

  translationLanguagechanged(languageCode) {
    this.config.translateLanguage = languageCode;
    this.updateConfiguration();
  }

  private updateConfiguration() {
    if (this.token) {
      this.localStorageService.setConfig(this.config);
      this.configService.updateConfig(this.token.userCode, this.config).subscribe(
        () => {
          this.snackBarService.show('Configuration updated successfully');
        },
        error => {
          this.snackBarService.show('Error updating the configuration');
          console.error('Error updating the configuration');
          console.error(error);
        }
      );
    }
  }

  follow() {
    this.showLoading = true;
    this.userService.follow(this.userConnected.code, this.userProfile.code).subscribe(
      (user: User) => {
        this.showLoading = false;
        this.userConnected = user;
        this.updateIsFollowing();
      },
      error => {
        this.showLoading = false;
        console.error('Error following');
        console.error(error);
      }
    );
  }

  unfollow() {
    this.showLoading = true;
    this.userService.unfollow(this.userConnected.code, this.userProfile.code).subscribe(
      (user: User) => {
        this.showLoading = false;
        this.userConnected = user;
        this.updateIsFollowing();
      },
      error => {
        this.showLoading = false;
        console.error('Error unfollowing');
        console.error(error);
      }
    );
  }

  inputPassword(field: string) {
    if (this.registerForm[field].value.length > 0) {
      console.log(`touch!!!`);
      this.registerForm[field].markAsTouched();
    }
  }

  checkAvailability(field: string) {
    console.log('checkAvailability');
    if (this.registerForm[field].value !== this.userConnected[field]) {
      setTimeout(() => {
        this.userService.find(field, this.registerForm[field].value).subscribe(
          () => this.repeatData[field] = true,
          () => this.repeatData[field] = false
        );
      }, 100);
    }

  }

  choosePicture(files: FileList) {
    // const f = evt.target.files[0]; // FileList object
    const fileToUpload: File = files.item(0);
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = ((theFile) => {
      if (theFile) {
        console.log(`the file:`);
        console.log(theFile);
      }
      return (e) => {
        this.registerForm.picture = 'data:image/png;base64,' + window.btoa(e.target.result);
      };
    })(fileToUpload);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(fileToUpload);
  }

  updateProfile() {
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
      let userPicture = 'user-default.png';
      if (this.registerForm.picture !== '../../../assets/images/user.png') {
        userPicture = this.registerForm.picture;
      }
      const data: User = {
        username: this.registerForm.username.value,
        email: this.registerForm.email.value,
        password: this.registerForm.password.value,
        picture: userPicture,
        friends: []
      };

      this.userService.update(this.userConnected.code, data).subscribe(
        (userUpdated: User) => {
          this.showLoading = false;
          this.snackBarService.show('Your profile has been updated successfully');
          let changeUrl = false;
          if (this.userConnected.username !== userUpdated.username) {
            changeUrl = true;
          }

          this.userConnected = userUpdated;
          this.localStorageService.setUserConnected(userUpdated);
          this.eventsService.publish('user-updated', userUpdated);

          if (changeUrl) {
            this.router.navigateByUrl(`/profile/${userUpdated.username}`).catch(console.error);
          }
        },
        errorCreatingUser => {
          this.snackBarService.show('Error updating the profile');
          this.showLoading = false;
          console.error(`Error updating user`);
          console.error(errorCreatingUser);
        }
      );
    }
  }

  logout() {
    console.log(`logut...`);
    this.localStorageService.clear();
    this.eventsService.publish('user-logout');
    this.router.navigateByUrl('/login').catch(console.error);
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

  private initUserForm() {
    this.registerForm.username.setValue(this.userConnected.username);
    this.registerForm.email.setValue(this.userConnected.email);
    this.registerForm.picture = this.userConnected.picture;
    this.registerForm.password.setValue('');
    this.registerForm.passwordRepeat.setValue('');
  }

  setReadMode(value: boolean) {
    this.readMode = value;
    if (this.readMode) {
      this.initUserForm();
    }
  }

}
