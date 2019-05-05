import { LeagueDescription } from '../model/league-description';

export class LeagueFilter {

  textFilter:         string;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;

  leagues:         LeagueDescription[];
  filteredLeagues: LeagueDescription[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
  }

  updateLeagues(leagues: LeagueDescription[]): void {
    this.leagues =  leagues;
    this.filterLeagues();
  }

  filterLeagues(): void {
    var tempList = [];

    for (let league of this.leagues) {
      var mustAdd = true;

      if (this.textFilter.trim()) {
        if (league.name.toLowerCase().indexOf(this.textFilter) === -1) {
            mustAdd = false;
        }
      }

      if ((league.kind === 'BEACH') && !this.isBeachChecked) {
        mustAdd = false;
      } else if ((league.kind === 'INDOOR') && !this.isIndoorChecked) {
        mustAdd = false;
      } else if ((league.kind === 'INDOOR_4X4') && !this.isIndoor4x4Checked) {
        mustAdd = false;
      }

      if (mustAdd) {
        tempList.push(league);
      }
    }

    this.filteredLeagues = tempList;
  }

  filterFromText(textFilter: HTMLInputElement): void {
    this.textFilter = textFilter.value.toLowerCase();
    this.filterLeagues();
  }

  toggleBeach(): void {
    this.isBeachChecked = !this.isBeachChecked;
    this.changeToggleButtonState('beach-button', this.isBeachChecked);
    this.filterLeagues();
  }

  toggleIndoor(): void {
    this.isIndoorChecked = !this.isIndoorChecked;
    this.changeToggleButtonState('indoor-button', this.isIndoorChecked);
    this.filterLeagues();
  }

  toggleIndoor4x4(): void {
    this.isIndoor4x4Checked = !this.isIndoor4x4Checked;
    this.changeToggleButtonState('indoor-4x4-button', this.isIndoor4x4Checked);
    this.filterLeagues();
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
