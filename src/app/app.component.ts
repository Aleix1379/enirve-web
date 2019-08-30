import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Prototypes} from './prototypes';
import {DeviceService} from './services/device/device.service';
import {LocalStorageService} from './services/localStorage/local-storage.service';
import {Token} from './interfaces/Token';
import {UserService} from './services/user/user.service';
import {EventsService} from './services/events/events.service';
import {ConfigService} from './services/config/config.service';
import {Config} from './interfaces/Config';
import {User} from './interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Enirve';
  tabIndex = 1;
  showTabs = true;
  isDesktop: boolean;
  currentPath: string;
  token: Token;
  user: User;

  constructor(router: Router,
              private deviceService: DeviceService,
              private userService: UserService,
              private localStorageService: LocalStorageService,
              private eventsService: EventsService,
              private configService: ConfigService
  ) {

    Prototypes.loadPrototypes();

    this.eventsService.subscribe('user-logined', (token: Token) => {
      this.token = token;
      this.downloadUserConfig();
      this.downloadUser();
    });

    this.isDesktop = this.deviceService.isDesktop() || this.deviceService.isBigDesktop();
    this.token = this.localStorageService.getItem<Token>('auth-token');

    this.downloadUserConfig();
    this.downloadUser();

    console.log(`router.url:`);
    console.log(router.url);
    console.log(`******************************************************************************************`);

    router.events.subscribe(() => {
      this.currentPath = router.url;
      if (router.url === '/') {
        this.tabIndex = 1;
        this.showTabs = true;
      } else if (router.url.includes('/profile')) {
        this.tabIndex = 2;
        const username: string = router.url.split('/')[2];
        this.showTabs = !this.user || this.user.username === username;
      } else {
        this.showTabs = false;
      }

      if (deviceService.isDesktop() || deviceService.isBigDesktop()) {
        this.showTabs = false;
      }

    });
  }

  setTab(index: number) {
    this.tabIndex = index;
  }

  private downloadUser() {
    if (this.token) {
      this.userService.findByCode(this.token.userCode).subscribe(data => {
        this.user = data;
        this.localStorageService.setItem<User>('user-connected', this.user);
      }, error => console.error(error));
    }
  }

  private downloadUserConfig() {
    if (this.token) {
      this.configService.getConfig(this.token.userCode).subscribe(
        data => this.localStorageService.setItem<Config>('config', data),
        error => {
          console.error('error donwloading user configuration');
          console.error(error);
        }
      );
    }
  }

}
