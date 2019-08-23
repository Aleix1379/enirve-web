import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Token} from '../../interfaces/Token';
import {UserService} from '../../services/user/user.service';
import {User} from '../../interfaces/User';
import {Config} from '../../interfaces/Config';
import {ConfigService} from '../../services/config/config.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showLoginRequired = false;
  user: User;
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

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private configService: ConfigService,
    private snackBarService: SnackBarService
  ) {
    this.token = this.localStorageService.getItem<Token>('auth-token');
    if (!this.token) {
      this.showLoginRequired = true;
    } else {
      this.showLoginRequired = false;
      this.config = this.localStorageService.getItem<Config>('config');
      this.translationEnabled = !!this.config.translateLanguage;

      this.userService.find('code', this.token.userCode).subscribe(data => {
        this.user = data;
      }, error => {
        console.error('error downloading user data');
        console.error(error);
      });
    }
  }

  ngOnInit() {
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

}
