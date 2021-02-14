import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchType:    SearchType;
  searchToken:   string;
  searchDateStr: string;
  searchDate:    Date;
  
  searchTypeEnum: typeof SearchType = SearchType;
  searchCriteria: SearchCriterion[];

  searchTokenControl: FormControl;
  loadSearchResults: boolean;

  constructor(private titleService: Title, private datePipe: DatePipe) {
    this.titleService.setTitle('VBR - Search Games');
    this.loadSearchResults = false;
    this.searchTokenControl = new FormControl('', [Validators.required, Validators.minLength(3)])

    this.searchToken = '';
    this.searchDate = new Date();
    this.searchDateStr = this.datePipe.transform(this.searchDate, 'yyyy-MM-dd');
    this.searchCriteria = [
      { type: SearchType.Live, display: 'Live games' },
      { type: SearchType.Today, display: 'Today\'s games' },
      { type: SearchType.Date, display: 'By date' },
      { type: SearchType.Token, display: 'By team, league or referee' }
    ];
    this.searchType = SearchType.Live;
  }

  getPageNumber(): number {
    return 6;
  }

  canSearch(): boolean {
    switch (this.searchType) {
      case SearchType.Token:
        return this.searchTokenControl.valid;
      case SearchType.Live:
      case SearchType.Date:
      case SearchType.Today:
        return true;
      default:
        return false;
    }
  }

  search(): void {
    switch (this.searchType) {
      case SearchType.Token:
        this.searchToken = this.searchTokenControl.value;
        this.loadSearchResults = this.searchTokenControl.valid;
        break;
      case SearchType.Live:
        this.loadSearchResults = true;
        break;
      case SearchType.Date:
        this.searchDateStr = this.datePipe.transform(this.searchDate, 'yyyy-MM-dd');
        this.loadSearchResults = true;
        break;
      case SearchType.Today:
        this.searchDateStr = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.loadSearchResults = true;
        break;
      default:
        this.loadSearchResults = false;
        break;
    }
  }

  onSelectionChanged(): void {
    this.loadSearchResults = false;
  }
 
}

export enum SearchType {
    Token = 1,
    Live  = 2,
    Date  = 3,
    Today = 4
}

interface SearchCriterion {
  type: SearchType;
  display: string;
}
