import { LeagueSummary } from 'src/app/shared/models/league.model';

export abstract class AbstractLeagueFilter {

  textFilter:         string;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;
  isSnowChecked:      boolean;

  leagues:         LeagueSummary[];
  filteredLeagues: LeagueSummary[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
    this.isSnowChecked = true;
  }

  abstract refreshLeagues(): void;

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

  onLeaguesReceived(leagues: LeagueSummary[]): void {
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

  toggleSnow(button: HTMLElement): void {
    this.isSnowChecked = !this.isSnowChecked;
    this.toggleButton(button, this.isSnowChecked, 'vbr-snow-chip');
  }

  toggleButton(button: HTMLElement, selected: boolean, clazz: string): void {
    if (selected) {
      button.classList.add(clazz);
    } else {
      button.classList.remove(clazz);
    }
    this.refreshLeagues();
  }

}
