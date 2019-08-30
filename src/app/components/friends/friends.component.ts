import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/User';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Token} from '../../interfaces/Token';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Input() friends: User[];
  token: Token;

  constructor(private router: Router,
              private localStorageService: LocalStorageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.token = this.localStorageService.getItem<Token>('auth-token');
  }

  visitProfile(username: string) {
    this.router.navigateByUrl(`/profile/${username}`).catch(console.error);
  }

}
