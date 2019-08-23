import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent implements OnInit {
  @Input() message: string;
  @Input() onlyToLogin = false;
  @Output() close = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router
      .navigateByUrl('/login')
      .catch(console.error);
  }

  continueWithoutUser() {
    this.close.emit();
  }

}
