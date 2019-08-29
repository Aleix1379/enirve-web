import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Input() friends: User[];

  constructor(private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    console.log(`consfriends`);
  }

  ngOnInit() {
  }

  visitProfile(username: string) {
    this.router.navigateByUrl(`/profile/${username}`).catch(console.error);
  }

}
