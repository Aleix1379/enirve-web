import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userImage: string;
  @Input() userName: string;
  @Input() currentPath: string;

  constructor() {
  }

  ngOnInit() {
  }

  onwProfile() {
    if (!this.currentPath) {
      return false;
    }
    return this.currentPath.split('/').pop() === this.userName;
  }

}
