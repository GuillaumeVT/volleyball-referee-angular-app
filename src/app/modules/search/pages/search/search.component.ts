import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchType: SearchType;

  tokenSearchCriterion: SearchCriterion;
  liveSearchCriterion: SearchCriterion;
  dateSearchCriterion: SearchCriterion;
  todaySearchCriterion: SearchCriterion;

  searchTypeEnum: typeof SearchType = SearchType;
  searchCriteria: SearchCriterion[];

  searchTokenControl: UntypedFormControl;
  loadSearchResults: boolean;
  minSearchLength: number;

  constructor(
    private titleService: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private translate: TranslateService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.translate.get('search.page').subscribe((t) => this.titleService.setTitle(t));
    this.loadSearchResults = false;
    this.searchType = SearchType.Token;
    this.minSearchLength = 3;

    this.tokenSearchCriterion = { type: SearchType.Token, typeStr: 'token', value: '', display: 'search.option.token' };
    this.liveSearchCriterion = { type: SearchType.Live, typeStr: 'live', value: null, display: 'search.option.live' };
    this.dateSearchCriterion = { type: SearchType.Date, typeStr: 'date', value: new Date(), display: 'search.option.date' };
    this.todaySearchCriterion = { type: SearchType.Today, typeStr: 'today', value: new Date(), display: 'search.option.today' };

    this.searchCriteria = [this.tokenSearchCriterion, this.liveSearchCriterion, this.dateSearchCriterion, this.todaySearchCriterion];

    this.searchTokenControl = new UntypedFormControl('', [Validators.required, Validators.minLength(this.minSearchLength)]);
    this.searchTokenControl.valueChanges.subscribe((token) => (this.tokenSearchCriterion.value = token));
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((_routeParams) => this.loadSearch());
  }

  loadSearch(): void {
    const searchTypeParam = this.activeRoute.snapshot.queryParamMap.get('type');
    const valueParam = this.activeRoute.snapshot.queryParamMap.get('value');

    if (searchTypeParam) {
      const searchCriterion: SearchCriterion = this.searchCriteria.find((searchCriterion) => searchCriterion.typeStr === searchTypeParam);

      if (searchCriterion) {
        this.searchType = searchCriterion.type;

        switch (this.searchType) {
          case SearchType.Token:
            if (valueParam) {
              this.searchTokenControl.setValue(valueParam);
              this.tokenSearchCriterion.value = valueParam;
              this.loadSearchResults = this.searchTokenControl.valid;
            }
            break;
          case SearchType.Live:
            this.loadSearchResults = true;
            break;
          case SearchType.Date:
            if (valueParam) {
              this.dateSearchCriterion.value = new Date(valueParam);
              this.loadSearchResults = this.dateSearchCriterion.value?.getTime() > 0;
            }
            break;
          case SearchType.Today:
            this.loadSearchResults = true;
            break;
          default:
            this.loadSearchResults = false;
            break;
        }
      }
    } else {
      this.searchType = SearchType.Token;
      this.loadSearchResults = false;
    }
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

  onSearch(): void {
    switch (this.searchType) {
      case SearchType.Token:
        this.router.navigate(['/search'], {
          queryParams: { type: this.tokenSearchCriterion.typeStr, value: this.tokenSearchCriterion.value },
        });
        break;
      case SearchType.Live:
        this.router.navigate(['/search'], { queryParams: { type: this.liveSearchCriterion.typeStr } });
        break;
      case SearchType.Date:
        this.router.navigate(['/search'], {
          queryParams: {
            type: this.dateSearchCriterion.typeStr,
            value: this.datePipe.transform(this.dateSearchCriterion.value, 'yyyy-MM-dd'),
          },
        });
        break;
      case SearchType.Today:
        this.router.navigate(['/search'], { queryParams: { type: this.todaySearchCriterion.typeStr } });
        break;
      default:
        break;
    }
  }

  onSelectionChanged(): void {
    this.loadSearchResults = false;
  }
}

export enum SearchType {
  Token = 1,
  Live = 2,
  Date = 3,
  Today = 4,
}

export interface SearchCriterion {
  type: SearchType;
  typeStr: string;
  value: any;
  display: string;
}
