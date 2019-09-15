import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {User} from '../../interfaces/User';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  users: User[] = [];
  userConnected: User;

  private routeSub: any;  // subscription to route observer

  constructor(private userService: UserService,
              private snackBarService: SnackBarService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    console.log(`ng init....`);
    this.userConnected = this.localStorageService.getUserConnected();

    // Register to Angular navigation events to detect navigating away (so we can save changed settings for example)

    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // save your data
        console.log(`navigation start...`);
        if (event.url.includes('/profile/') && event.url !== `/profile/${this.userConnected.username}`) {
          console.log(`navegant a un perfile que no es el meu, NO ELIMINAR DADES`);
        } else {
          console.log(`ELIMINAR DADES`);
          this.localStorageService.removeUserSearch();
        }
        console.log(`*******************************************************`);
      }
    });

  }

  searchUsers = (value: string) => {
    console.log(`REVENT CRIDA SEARCH USERS PARAM: "${value}"`);
    this.localStorageService.setUserSearch(value);

    this.userService.filter('username', value).subscribe(
      data => this.users = data,
      error => {
        this.snackBarService.show(`Error searching users`);
        console.error('Error searching users');
        console.error(error);
      }
    );
  };

  public ngOnDestroy() {
    console.log(`on destroy`);
    this.routeSub.unsubscribe();
  }

}
