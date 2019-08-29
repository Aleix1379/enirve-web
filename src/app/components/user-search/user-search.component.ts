import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  search = new FormControl({value: '', disabled: false});
  users: User[] = [];

  constructor(private userService: UserService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
  }

  searchUsers() {
    this.userService.filter('username', this.search.value).subscribe(
      data => this.users = data,
      error => {
        this.snackBarService.show(`Error searching users`);
        console.error('Error searching users');
        console.error(error);
      }
    );
  }

}
