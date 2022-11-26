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
  public searchType: SearchType;

  public tokenSearchCriterion: SearchCriterion;
  public liveSearchCriterion: SearchCriterion;
  public dateSearchCriterion: SearchCriterion;
  public todaySearchCriterion: SearchCriterion;

  searchTypeEnum: typeof SearchType = SearchType;
  public searchCriteria: SearchCriterion[];

  public searchTokenControl: UntypedFormControl;
  public loadSearchResults: boolean;
  public minSearchLength: number;

  constructor(
    private _titleService: Title,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _datePipe: DatePipe,
    private _translateService: TranslateService,
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this._translateService.get('search.page').subscribe((t) => this._titleService.setTitle(t));
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

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe((_routeParams) => this.loadSearch());
  }

  private loadSearch(): void {
    const searchTypeParam = this._activatedRoute.snapshot.queryParamMap.get('type');
    const valueParam = this._activatedRoute.snapshot.queryParamMap.get('value');

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

  public canSearch(): boolean {
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

  public onSearch(): void {
    switch (this.searchType) {
      case SearchType.Token:
        this._router.navigate(['/search'], {
          queryParams: { type: this.tokenSearchCriterion.typeStr, value: this.tokenSearchCriterion.value },
        });
        break;
      case SearchType.Live:
        this._router.navigate(['/search'], { queryParams: { type: this.liveSearchCriterion.typeStr } });
        break;
      case SearchType.Date:
        this._router.navigate(['/search'], {
          queryParams: {
            type: this.dateSearchCriterion.typeStr,
            value: this._datePipe.transform(this.dateSearchCriterion.value, 'yyyy-MM-dd'),
          },
        });
        break;
      case SearchType.Today:
        this._router.navigate(['/search'], { queryParams: { type: this.todaySearchCriterion.typeStr } });
        break;
      default:
        break;
    }
  }

  public onSelectionChanged(): void {
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
