import { LeagueSummary } from '../model/league';

export class LeagueFilter {

  textFilter:         string;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;

  leagues:         LeagueSummary[];
  filteredLeagues: LeagueSummary[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
  }

  updateLeagues(leagues: LeagueSummary[]): void {
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

  toggleButton(button: HTMLElement, selected: boolean, clazz: string): void {
    if (selected) {
      button.classList.add(clazz);
    } else {
      button.classList.remove(clazz);
    }
    this.filterLeagues();
  }

}
