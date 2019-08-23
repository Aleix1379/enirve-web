import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Prototypes} from './prototypes';
import {DeviceService} from './services/device/device.service';
import {LocalStorageService} from './services/localStorage/local-storage.service';
import {Token} from './interfaces/Token';
import {UserService} from './services/user/user.service';
import {ImageService} from './services/image/image.service';
import {EventsService} from './services/events/events.service';
import {ConfigService} from './services/config/config.service';
import {Config} from './interfaces/Config';

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
  userImage: string;
  currentPath: string;
  token: Token;

  constructor(router: Router,
              private deviceService: DeviceService,
              private userService: UserService,
              private localStorageService: LocalStorageService,
              private imageService: ImageService,
              private eventsService: EventsService,
              private configService: ConfigService
  ) {

    Prototypes.loadPrototypes();

    this.eventsService.subscribe('user-logined', () => {
      this.downloadUserImage();
      this.downloadUserConfig();
    });

    this.isDesktop = this.deviceService.isDesktop() || this.deviceService.isBigDesktop();
    this.token = this.localStorageService.getItem<Token>('auth-token');

    this.downloadUserImage();
    this.downloadUserConfig();

    console.log(`router.url:`);
    console.log(router.url);
    console.log(`******************************************************************************************`);

    router.events.subscribe(() => {
      this.currentPath = router.url;
      if (router.url === '/') {
        this.tabIndex = 1;
        this.showTabs = true;
      } else if (router.url === '/profile') {
        this.tabIndex = 2;
        this.showTabs = true;
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

  private downloadUserImage() {
    if (this.token) {
      this.userService.find('code', this.token.userCode).subscribe(async data => {
          this.imageService.downloadImage(data.picture)
            .then(result => {
              this.userImage = result;
            })
            .catch(console.error);

        },
        console.error
      );
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
