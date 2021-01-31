import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchType:    SearchType;
  searchToken:   string;
  searchDateStr: string;
  searchDate:    Date;
  minDate:       Date;

  searchTypeEnum: typeof SearchType = SearchType;

  constructor(private titleService: Title, private datePipe: DatePipe) {
    this.titleService.setTitle('VBR - Search Games');
    this.searchToken = '';
    this.searchDate = new Date();
    this.minDate = new Date(2019, 1, 1, 0, 0, 0);
  }

  ngOnInit() { }

  getPageNumber(): number {
    return 6;
  }

  onSearchTokenClicked(): void {
    if (this.searchToken && this.searchToken.length > 2) {
      this.searchType = SearchType.Token;
    }
  }

  onSearchLiveClicked(): void {
    this.searchType = SearchType.Live;
  }

  onSearchTodayClicked(): void {
    this.searchType = SearchType.Date;
    this.searchDateStr = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  onSearchDateClicked(): void {
    if (this.searchDate) {
      this.searchType = SearchType.Date;
      this.searchDateStr = this.datePipe.transform(this.searchDate, 'yyyy-MM-dd');
    }
  }

}

export enum SearchType {
    Token = 1,
    Live  = 2,
    Date  = 3
}
