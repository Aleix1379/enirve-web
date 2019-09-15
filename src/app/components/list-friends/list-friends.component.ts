import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.scss']
})
export class ListFriendsComponent implements OnInit {
  @Input() friends: User[];
  @Input() userConnected: User;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  visitProfile(username: string) {
    if (username !== (this.userConnected && this.userConnected.username)) {
      this.router.navigateByUrl(`/profile/${username}`).catch(console.error);
    }
  }

}
