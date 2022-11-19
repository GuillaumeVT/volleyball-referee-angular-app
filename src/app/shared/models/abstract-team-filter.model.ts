import { FetchBehaviour, Page, Paging } from '@shared/models/page.model';
import { TeamSummary } from '@shared/models/team.model';

export abstract class AbstractTeamFilter {
  private _textFilter: string;
  private _isBeachChecked: boolean;
  private _isIndoorChecked: boolean;
  private _isIndoor4x4Checked: boolean;
  private _isSnowChecked: boolean;
  private _isMixedChecked: boolean;
  private _isLadiesChecked: boolean;
  private _isGentsChecked: boolean;

  private _defaultSize: number;
  private _currentFetchBehaviour: FetchBehaviour;

  public nextPage: number;
  public size: number;
  public total: number;
  public last: boolean;

  public teams: TeamSummary[];
  public filteredTeams: TeamSummary[];

  constructor(size: number) {
    this._textFilter = '';
    this._isBeachChecked = true;
    this._isIndoorChecked = true;
    this._isIndoor4x4Checked = true;
    this._isSnowChecked = true;
    this._isMixedChecked = true;
    this._isLadiesChecked = true;
    this._isGentsChecked = true;
    this.nextPage = 0;
    this._defaultSize = size;
    this.size = size;
    this.total = 0;
    this.last = true;
    this._currentFetchBehaviour = FetchBehaviour.LOAD;
  }

  protected requestRefreshTeams(fetchBehaviour: FetchBehaviour): void {
    this._currentFetchBehaviour = fetchBehaviour;
    this.refreshTeams(this.computePaging(fetchBehaviour));
  }

  abstract refreshTeams(paging: Paging): void;

  private computePaging(fetchBehaviour: FetchBehaviour): Paging {
    switch (fetchBehaviour) {
      case FetchBehaviour.LOAD:
        return { page: 0, size: this.size };
      case FetchBehaviour.APPEND:
        return { page: this.nextPage, size: this.size };
      case FetchBehaviour.REFRESH:
        return { page: 0, size: this.nextPage * this.size };
    }
  }

  protected getKinds(): string[] {
    const kinds: string[] = [];
    if (this._isBeachChecked) {
      kinds.push('BEACH');
    }
    if (this._isIndoorChecked) {
      kinds.push('INDOOR');
    }
    if (this._isIndoor4x4Checked) {
      kinds.push('INDOOR_4X4');
    }
    if (this._isSnowChecked) {
      kinds.push('SNOW');
    }
    return kinds;
  }

  protected getGenders(): string[] {
    const genders: string[] = [];
    if (this._isMixedChecked) {
      genders.push('MIXED');
    }
    if (this._isLadiesChecked) {
      genders.push('LADIES');
    }
    if (this._isGentsChecked) {
      genders.push('GENTS');
    }
    return genders;
  }

  protected onTeamsReceived(page: Page<TeamSummary>): void {
    if (page === null) {
      this.teams = [];
    } else {
      if (page.first) {
        this.teams = page.content;
      } else {
        this.teams = this.teams.concat(page.content);
      }

      switch (this._currentFetchBehaviour) {
        case FetchBehaviour.LOAD:
        case FetchBehaviour.APPEND:
          this.nextPage = page.number + 1;
          break;
        case FetchBehaviour.REFRESH:
          this.nextPage = page.numberOfElements / this._defaultSize;
          break;
      }

      this.total = page.totalElements;
      this.last = page.last;

      this.filterTeams();
    }
  }

  protected filterTeams(): void {
    var tempList = [];

    for (let team of this.teams) {
      var mustAdd = true;

      if (this._textFilter.trim()) {
        if (team.name.toLowerCase().indexOf(this._textFilter) === -1) {
          mustAdd = false;
        }
      }

      if (mustAdd) {
        tempList.push(team);
      }
    }

    this.filteredTeams = tempList;
  }

  public filterFromText(textFilter: HTMLInputElement): void {
    this._textFilter = textFilter.value.toLowerCase();
    this.filterTeams();
  }

  public toggleBeach(button: HTMLElement): void {
    this._isBeachChecked = !this._isBeachChecked;
    this.toggleButton(button, this._isBeachChecked, 'vbr-beach-chip');
  }

  public toggleIndoor(button: HTMLElement): void {
    this._isIndoorChecked = !this._isIndoorChecked;
    this.toggleButton(button, this._isIndoorChecked, 'vbr-indoor-chip');
  }

  public toggleIndoor4x4(button: HTMLElement): void {
    this._isIndoor4x4Checked = !this._isIndoor4x4Checked;
    this.toggleButton(button, this._isIndoor4x4Checked, 'vbr-indoor-4x4-chip');
  }

  public toggleSnow(button: HTMLElement): void {
    this._isSnowChecked = !this._isSnowChecked;
    this.toggleButton(button, this._isSnowChecked, 'vbr-snow-chip');
  }

  public toggleMixed(button: HTMLElement): void {
    this._isMixedChecked = !this._isMixedChecked;
    this.toggleButton(button, this._isMixedChecked, 'vbr-mixed-chip');
  }

  public toggleLadies(button: HTMLElement): void {
    this._isLadiesChecked = !this._isLadiesChecked;
    this.toggleButton(button, this._isLadiesChecked, 'vbr-ladies-chip');
  }

  public toggleGents(button: HTMLElement): void {
    this._isGentsChecked = !this._isGentsChecked;
    this.toggleButton(button, this._isGentsChecked, 'vbr-gents-chip');
  }

  private toggleButton(button: HTMLElement, selected: boolean, clazz: string): void {
    if (selected) {
      button.classList.add(clazz);
    } else {
      button.classList.remove(clazz);
    }
    this.requestRefreshTeams(FetchBehaviour.LOAD);
  }
}
