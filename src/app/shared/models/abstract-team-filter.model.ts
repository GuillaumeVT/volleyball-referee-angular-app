import { Page } from 'src/app/shared/models/page.model';
import { TeamSummary } from 'src/app/shared/models/team.model';

export abstract class AbstractTeamFilter {
  textFilter: string;
  isBeachChecked: boolean;
  isIndoorChecked: boolean;
  isIndoor4x4Checked: boolean;
  isSnowChecked: boolean;
  isMixedChecked: boolean;
  isLadiesChecked: boolean;
  isGentsChecked: boolean;

  page: number;
  size: number;
  last: boolean;

  teams: TeamSummary[];
  filteredTeams: TeamSummary[];

  constructor(size: number) {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
    this.isSnowChecked = true;
    this.isMixedChecked = true;
    this.isLadiesChecked = true;
    this.isGentsChecked = true;
    this.page = 0;
    this.size = size;
    this.last = true;
  }

  abstract refreshTeams(append: boolean): void;

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

  onTeamsReceived(page: Page<TeamSummary>): void {
    if (page === null) {
      this.teams = [];
    } else {
      if (page.first) {
        this.teams = page.content;
      } else {
        this.teams = this.teams.concat(page.content);
      }

      this.page = this.page + 1;
      this.last = page.last;

      this.filterTeams();
    }
  }

  filterTeams(): void {
    var tempList = [];

    for (let team of this.teams) {
      var mustAdd = true;

      if (this.textFilter.trim()) {
        if (team.name.toLowerCase().indexOf(this.textFilter) === -1) {
          mustAdd = false;
        }
      }

      if (mustAdd) {
        tempList.push(team);
      }
    }

    this.filteredTeams = tempList;
  }

  filterFromText(textFilter: HTMLInputElement): void {
    this.textFilter = textFilter.value.toLowerCase();
    this.filterTeams();
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
    this.refreshTeams(false);
  }
}
