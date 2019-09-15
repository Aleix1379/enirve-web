import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() onSearch: any;
  searchText = '';

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    const searchText = this.localStorageService.getUserSearch();
    console.log(`searchText: ${searchText}`);

    if (searchText) {
      console.log(`user search get search...`);
      console.log(searchText);
      this.search(searchText);
    }

  }

  search(value: string) {
    this.searchText = value;
    if (this.onSearch) {
      console.log(`searching...`);
      console.log('ON SEARCH TEXT => ' + this.searchText);
      this.onSearch(this.searchText);
    } else {
      console.warn('onSearch is NULL');
    }
  }

}
