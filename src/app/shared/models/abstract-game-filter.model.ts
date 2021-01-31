import { GameSummary } from 'src/app/shared/models/game.model';
import { Page } from 'src/app/shared/models/page.model';

export abstract class AbstractGameFilter {

  textFilter:         string;
  isLiveChecked:      boolean;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;
  isSnowChecked:      boolean;
  isMixedChecked:     boolean;
  isLadiesChecked:    boolean;
  isGentsChecked:     boolean;

  page:  number;
  size:  number;
  total: number;
  last:  boolean;

  games:         GameSummary[];
  filteredGames: GameSummary[];

  constructor(size: number) {
    this.textFilter = '';
    this.isLiveChecked = true;
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
    this.isSnowChecked = true;
    this.isMixedChecked = true;
    this.isLadiesChecked = true;
    this.isGentsChecked = true;
    this.page = 0;
    this.size = size;
    this.total = 0;
    this.last = true;
  }

  abstract refreshGames(append: boolean): void;

  getStatuses(): string[] {
    const statuses: string[] = [];
    statuses.push('COMPLETED');
    statuses.push('SCHEDULED');
    if (this.isLiveChecked) {
      statuses.push('LIVE');
    }
    return statuses;
  }

  getKinds(): string[] {
    const kinds: string[] = [];
    if (this.isBeachChecked) {
      kinds.push('BEACH');
    }
    if (this.isIndoorChecked) {
      kinds.push('INDOOR');
    }
    if (this.isIndoor4x4Checked) {
      kinds.push('INDOOR_4X4');
    }
    if (this.isSnowChecked) {
      kinds.push('SNOW');
    }
    return kinds;
  }

  getGenders(): string[] {
    const genders: string[] = [];
    if (this.isMixedChecked) {
      genders.push('MIXED');
    }
    if (this.isLadiesChecked) {
      genders.push('LADIES');
    }
    if (this.isGentsChecked) {
      genders.push('GENTS');
    }
    return genders;
  }

  onGamesReceived(page: Page<GameSummary>): void {
    if (page === null) {
      this.games = [];
    } else {
      if (page.first) {
        this.games = page.content;
      } else {
        this.games = this.games.concat(page.content);
      }

      this.page = this.page + 1;
      this.total = page.totalElements;
      this.last = page.last;

      this.filterGames();
    }
  }

  filterGames(): void {
    var tempList = [];

    for (let game of this.games) {
      var mustAdd = false;

      if (this.textFilter.trim()) {
        if ((game.guestTeamName.toLowerCase().indexOf(this.textFilter) >= 0)
          || (game.homeTeamName.toLowerCase().indexOf(this.textFilter) >= 0)
          || (game.leagueName && game.leagueName.toLowerCase().indexOf(this.textFilter) >= 0)
          || (game.divisionName && game.divisionName.toLowerCase().indexOf(this.textFilter) >= 0)) {
            mustAdd = true;
        }
      } else {
        mustAdd = true;
      }

      if (mustAdd) {
        tempList.push(game);
      }
    }

    this.filteredGames = tempList;
  }

  filterFromText(textFilter: HTMLInputElement): void {
    this.textFilter = textFilter.value.toLowerCase();
    this.filterGames();
  }

  toggleLive(button: HTMLElement): void {
    this.isLiveChecked = !this.isLiveChecked;
    this.toggleButton(button, this.isLiveChecked, 'vbr-live-chip');
  }

  toggleBeach(button: HTMLElement): void {
    this.isBeachChecked = !this.isBeachChecked;
    this.toggleButton(button, this.isBeachChecked, 'vbr-beach-chip');
  }

  toggleIndoor(button: HTMLElement): void {
    this.isIndoorChecked = !this.isIndoorChecked;
    this.toggleButton(button, this.isIndoorChecked, 'vbr-indoor-chip');
  }

  toggleIndoor4x4(button: HTMLElement): void {
    this.isIndoor4x4Checked = !this.isIndoor4x4Checked;
    this.toggleButton(button, this.isIndoor4x4Checked, 'vbr-indoor-4x4-chip');
  }

  toggleSnow(button: HTMLElement): void {
    this.isSnowChecked = !this.isSnowChecked;
    this.toggleButton(button, this.isSnowChecked, 'vbr-snow-chip');
  }

  toggleMixed(button: HTMLElement): void {
    this.isMixedChecked = !this.isMixedChecked;
    this.toggleButton(button, this.isMixedChecked, 'vbr-mixed-chip');
  }

  toggleLadies(button: HTMLElement): void {
    this.isLadiesChecked = !this.isLadiesChecked;
    this.toggleButton(button, this.isLadiesChecked, 'vbr-ladies-chip');
  }

  toggleGents(button: HTMLElement): void {
    this.isGentsChecked = !this.isGentsChecked;
    this.toggleButton(button, this.isGentsChecked, 'vbr-gents-chip');
  }

  toggleButton(button: HTMLElement, selected: boolean, clazz: string): void {
    if (selected) {
      button.classList.add(clazz);
    } else {
      button.classList.remove(clazz);
    }
    this.refreshGames(false);
  }
}
