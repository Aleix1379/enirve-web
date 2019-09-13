import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/User';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Token} from '../../interfaces/Token';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Input() friends: User[];
  token: Token;
  showLoading = false;

  constructor(private router: Router,
              private userService: UserService,
              private localStorageService: LocalStorageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    try {
      this.showLoading = true;
      this.token = this.localStorageService.getItem<Token>('auth-token');
      const userConnected = await this.userService.findByCode(this.token.userCode).toPromise();
      if (!this.friends) {
        this.friends = await this.userService.getFriends(this.token.userCode).toPromise();
        this.friends.push(userConnected);
        this.showLoading = false;
      }
    } catch (error) {
      this.showLoading = false;
      console.error(`Error downloading friends...`);
      console.error(error);
    }
  }

  visitProfile(username: string) {
    this.router.navigateByUrl(`/profile/${username}`).catch(console.error);
  }

}
