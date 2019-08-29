import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {ConfigService} from '../../services/config/config.service';
import {UserService} from '../../services/user/user.service';
import {Token} from '../../interfaces/Token';
import {Config} from '../../interfaces/Config';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showLoginRequired = false;
  userConnected: User;
  userProfile: User;
  friends: User[] = [];
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

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private configService: ConfigService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit() {
    console.log(`ng on init`);
    this.friends = [];
    this.username = this.router.url.split('/')[2];

    this.token = this.localStorageService.getItem<Token>('auth-token');
    if (!this.token) {
      this.showLoginRequired = true;
    } else {
      this.showLoginRequired = false;
      this.config = this.localStorageService.getItem<Config>('config');
      this.translationEnabled = !!this.config.translateLanguage;

      const userConnectedPromise = this.userService.findByCode(this.token.userCode).toPromise();
      const userProfilePromise = this.userService.find('username', this.username).toPromise();

      this.showLoading = true;
      Promise.all([userConnectedPromise, userProfilePromise])
        .then(result => {
          this.showLoading = false;
          this.userConnected = result[0];
          this.userProfile = result[1];
          this.updateIsFollowing();
        })
        .catch(error => {
          this.showLoading = false;
          console.error('error downloading user data');
          console.error(error);
        });

      this.userService.getFriends(this.token.userCode).subscribe(data => {
        this.friends = data;
      }, error => {
        console.error('error downloading friends');
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
      this.localStorageService.setItem<Config>('config', this.config);
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

}
