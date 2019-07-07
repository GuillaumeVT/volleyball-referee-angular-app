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

  toggleBeach(): void {
    this.isBeachChecked = !this.isBeachChecked;
    this.changeToggleButtonState('beach-button', this.isBeachChecked);
    this.filterTeams();
  }

  toggleIndoor(): void {
    this.isIndoorChecked = !this.isIndoorChecked;
    this.changeToggleButtonState('indoor-button', this.isIndoorChecked);
    this.filterTeams();
  }

  toggleIndoor4x4(): void {
    this.isIndoor4x4Checked = !this.isIndoor4x4Checked;
    this.changeToggleButtonState('indoor-4x4-button', this.isIndoor4x4Checked);
    this.filterTeams();
  }

  toggleMixed(): void {
    this.isMixedChecked = !this.isMixedChecked;
    this.changeToggleButtonState('mixed-button', this.isMixedChecked);
    this.filterTeams();
  }

  toggleLadies(): void {
    this.isLadiesChecked = !this.isLadiesChecked;
    this.changeToggleButtonState('ladies-button', this.isLadiesChecked);
    this.filterTeams();
  }

  toggleGents(): void {
    this.isGentsChecked = !this.isGentsChecked;
    this.changeToggleButtonState('gents-button', this.isGentsChecked);
    this.filterTeams();
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
