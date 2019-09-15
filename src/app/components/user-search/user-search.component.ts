import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {User} from '../../interfaces/User';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  search = new FormControl({value: '', disabled: false});
  users: User[] = [];
  userConnected: User;

  constructor(private userService: UserService,
              private snackBarService: SnackBarService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.userConnected = this.localStorageService.getUserConnected();
  }

  searchUsers = (value: string) => {
    this.userService.filter('username', value).subscribe(
      data => this.users = data,
      error => {
        this.snackBarService.show(`Error searching users`);
        console.error('Error searching users');
        console.error(error);
      }
    );
  }

}
