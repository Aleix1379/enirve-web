import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Device} from '../../interfaces/Devices';
import {SocialNetwork} from '../../interfaces/SocialNetwork';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  router: Router;
  devices: Device[];
  socialNetworks: SocialNetwork[];

  isShow: boolean;
  topPosToStartShowing = 100;
  mainDiv: HTMLElement;

  private static getDevices(): Device[] {
    return [
      {
        title: 'Web app',
        description: 'You can start practise with your computer using the web',
        backgroundImage: '../../assets/images/undraw_wireframing_nxyi.svg',
        sources: [{url: '/', text: 'Enirve'}]
      },
      {
        title: 'Mobile app',
        description: 'You can start practise with your phone, you just need download the app',
        backgroundImage: '../../assets/images/undraw_mobile_apps_4wgf.svg',
        sources: [
          {url: 'https://play.google.com/store/apps/details?id=com.aleixmp.eiv&hl=en_SG', text: 'Google play'},
          {url: 'https://itunes.apple.com/gb/app/enirve/id1375091827?mt=8', text: 'App Store'}
        ]
      }
    ];
  }

  private static getSocialNetworks(): SocialNetwork[] {
    return [
      {
        image: '../../assets/images/icons8-octocat.svg',
        socialNetworkName: 'GitHub',
        link: {text: 'Aleix1379', url: 'https://github.com/Aleix1379'}
      },
      {
        image: '../../assets/images/icons8-twitter.svg',
        socialNetworkName: 'Twitter',
        link: {text: 'aleixmp1379', url: 'https://twitter.com/aleixmp1379'}
      }/*,
      {
        image: '../../assets/images/aleix.jpg',
        socialNetworkName: 'Personal web page',
        link: {text: 'http://aleixmp.com', url: 'http://aleixmp.com'}
      }*/
    ];
  }

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.devices = LandingComponent.getDevices();
    this.socialNetworks = LandingComponent.getSocialNetworks();
    this.mainDiv = document.getElementById('app-landing-container');
  }

  checkScroll() {
    this.isShow = this.mainDiv.scrollTop >= this.topPosToStartShowing;
  }

  gotoTop() {
    console.log(`go to top....`);
    this.mainDiv.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  /*  goToLogin() {
      this.router.navigate(['/login'], {queryParams: {mode: 'signin'}}).then(console.log).catch(console.error);
    }

    goToSignup() {
      this.router.navigate(['/login'], {queryParams: {mode: 'signup'}}).then(console.log).catch(console.error);
    }*/


}
