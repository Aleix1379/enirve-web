import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  constructor(private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  close() {
    const user = this.localStorageService.getItem<User>('user-connected');
    this.router.navigateByUrl(`/profile/${user.username}`).catch(console.error);
  }

}
