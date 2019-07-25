import { GameSummary } from '../model/game';

export class GameFilter {

  textFilter:         string;
  isLiveChecked:      boolean;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;
  isTimeChecked:      boolean;
  isMixedChecked:     boolean;
  isLadiesChecked:    boolean;
  isGentsChecked:     boolean;

  games:         GameSummary[];
  filteredGames: GameSummary[];

  constructor() {
    this.textFilter = '';
    this.isLiveChecked = true;
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
    this.isTimeChecked = true;
    this.isMixedChecked = true;
    this.isLadiesChecked = true;
    this.isGentsChecked = true;
  }

  updateGames(games: GameSummary[]): void {
    this.games = games;
    this.filterGames();
  }

  filterGames(): void {
    var tempList = [];

    for (let game of this.games) {
      var mustAdd = true;

      if (this.textFilter.trim()) {
        if ((game.guestTeamName.toLowerCase().indexOf(this.textFilter) === -1)
          && (game.homeTeamName.toLowerCase().indexOf(this.textFilter) === -1)
          && (game.leagueName.toLowerCase().indexOf(this.textFilter) === -1)
          && (game.divisionName.toLowerCase().indexOf(this.textFilter) === -1)) {
            mustAdd = false;
        }
      }

      if (game.status === 'LIVE' && !this.isLiveChecked) {
        mustAdd = false;
      }

      if ((game.kind === 'BEACH') && !this.isBeachChecked) {
        mustAdd = false;
      } else if ((game.kind === 'INDOOR') && !this.isIndoorChecked) {
        mustAdd = false;
      } else if ((game.kind === 'INDOOR_4X4') && !this.isIndoor4x4Checked) {
        mustAdd = false;
      }

      if ((game.gender === 'MIXED') && !this.isMixedChecked) {
        mustAdd = false;
      } else if ((game.gender === 'LADIES') && !this.isLadiesChecked) {
        mustAdd = false;
      } else if ((game.gender === 'GENTS') && !this.isGentsChecked) {
        mustAdd = false;
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
    this.filterGames();
  }
}
