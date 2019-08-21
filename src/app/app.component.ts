import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Enirve';
  tabIndex = 1;
  showTabs = true;

  constructor(router: Router) {
    console.log(`router.url:`);
    console.log(router.url);

    console.log(`******************************************************************************************`);

    router.events.subscribe(data => {
      if (router.url === '/') {
        this.tabIndex = 1;
        this.showTabs = true;
      } else if (router.url === '/practice') {
        this.tabIndex = 2;
        this.showTabs = true;
      } else {
        this.showTabs = false;
      }
    });
  }

  setTab(index: number) {
    this.tabIndex = index;
  }
}
