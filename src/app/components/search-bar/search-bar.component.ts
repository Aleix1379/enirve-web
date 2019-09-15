import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() onSearch: any;
  searchText = '';

  constructor() {
  }

  ngOnInit() {
  }

  search() {
    if (this.onSearch) {
      this.onSearch(this.searchText);
    } else {
      console.warn('onSearch is NULL');
    }
  }

}
