import { GameDescription } from '../model/gamedescription';
import { Utils } from '../utils/utils';

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

  games:         GameDescription[];
  filteredGames: GameDescription[];

  utils: Utils;

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
    this.utils = new Utils();
  }

  updateGames(games: GameDescription[]): void {
    this.games = this.utils.sortGames(games);
    this.filterGames();
  }

  filterGames(): void {
    var tempList = [];

    for (let game of this.games) {
      var mustAdd = true;

      if (this.textFilter.trim()) {
        if ((game.gName.toLowerCase().indexOf(this.textFilter) === -1)
          && (game.hName.toLowerCase().indexOf(this.textFilter) === -1)
          && (game.league.toLowerCase().indexOf(this.textFilter) === -1)
          && (game.division.toLowerCase().indexOf(this.textFilter) === -1)) {
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
      } else if ((game.kind === 'TIME') && !this.isTimeChecked) {
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

  toggleLive(): void {
    this.isLiveChecked = !this.isLiveChecked;
    this.changeToggleButtonState('live-button', this.isLiveChecked);
    this.filterGames();
  }

  toggleBeach(): void {
    this.isBeachChecked = !this.isBeachChecked;
    this.changeToggleButtonState('beach-button', this.isBeachChecked);
    this.filterGames();
  }

  toggleIndoor(): void {
    this.isIndoorChecked = !this.isIndoorChecked;
    this.changeToggleButtonState('indoor-button', this.isIndoorChecked);
    this.filterGames();
  }

  toggleIndoor4x4(): void {
    this.isIndoor4x4Checked = !this.isIndoor4x4Checked;
    this.changeToggleButtonState('indoor-4x4-button', this.isIndoor4x4Checked);
    this.filterGames();
  }

  toggleTime(): void {
    this.isTimeChecked = !this.isTimeChecked;
    this.changeToggleButtonState('time-button', this.isTimeChecked);
    this.filterGames();
  }

  toggleMixed(): void {
    this.isMixedChecked = !this.isMixedChecked;
    this.changeToggleButtonState('mixed-button', this.isMixedChecked);
    this.filterGames();
  }

  toggleLadies(): void {
    this.isLadiesChecked = !this.isLadiesChecked;
    this.changeToggleButtonState('ladies-button', this.isLadiesChecked);
    this.filterGames();
  }

  toggleGents(): void {
    this.isGentsChecked = !this.isGentsChecked;
    this.changeToggleButtonState('gents-button', this.isGentsChecked);
    this.filterGames();
  }

  changeToggleButtonState(id: string, toggled: boolean): void {
    var button = document.getElementById(id);
    var buttonClasses = button.classList;
    if (toggled) {
      buttonClasses.remove('vbr-button-unchecked');
    } else {
      buttonClasses.add('vbr-button-unchecked');
    }
  }
}
