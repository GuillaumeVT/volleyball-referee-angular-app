import { TeamSummary } from '../model/team';

export class TeamFilter {

  textFilter:         string;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;
  isMixedChecked:     boolean;
  isLadiesChecked:    boolean;
  isGentsChecked:     boolean;

  teams:         TeamSummary[];
  filteredTeams: TeamSummary[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
    this.isMixedChecked = true;
    this.isLadiesChecked = true;
    this.isGentsChecked = true;
  }

  updateTeams(teams: TeamSummary[]): void {
    this.teams = teams;
    this.filterTeams();
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

      if ((team.kind === 'BEACH') && !this.isBeachChecked) {
        mustAdd = false;
      } else if ((team.kind === 'INDOOR') && !this.isIndoorChecked) {
        mustAdd = false;
      } else if ((team.kind === 'INDOOR_4X4') && !this.isIndoor4x4Checked) {
        mustAdd = false;
      }

      if ((team.gender === 'MIXED') && !this.isMixedChecked) {
        mustAdd = false;
      } else if ((team.gender === 'LADIES') && !this.isLadiesChecked) {
        mustAdd = false;
      } else if ((team.gender === 'GENTS') && !this.isGentsChecked) {
        mustAdd = false;
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
    this.filterTeams();
  }
}
