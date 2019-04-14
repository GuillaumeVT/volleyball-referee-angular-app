import { RulesDescription } from '../model/rules-description';

export class RulesFilter {

  textFilter:         string;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;

  rules:         RulesDescription[];
  filteredRules: RulesDescription[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
  }

  updateRules(rules: RulesDescription[]): void {
    this.rules = rules;
    this.filterRules();
  }

  filterRules(): void {
    var tempList = [];

    for (let rules of this.rules) {
      var mustAdd = true;

      if (this.textFilter.trim()) {
        if (rules.name.toLowerCase().indexOf(this.textFilter) === -1) {
            mustAdd = false;
        }
      }

      if ((rules.kind === 'BEACH') && !this.isBeachChecked) {
        mustAdd = false;
      } else if ((rules.kind === 'INDOOR') && !this.isIndoorChecked) {
        mustAdd = false;
      } else if ((rules.kind === 'INDOOR_4X4') && !this.isIndoor4x4Checked) {
        mustAdd = false;
      }

      if (mustAdd) {
        tempList.push(rules);
      }
    }

    this.filteredRules = tempList;
  }

  filterFromText(textFilter: HTMLInputElement): void {
    this.textFilter = textFilter.value.toLowerCase();
    this.filterRules();
  }

  toggleBeach(): void {
    this.isBeachChecked = !this.isBeachChecked;
    this.changeToggleButtonState('beach-button', this.isBeachChecked);
    this.filterRules();
  }

  toggleIndoor(): void {
    this.isIndoorChecked = !this.isIndoorChecked;
    this.changeToggleButtonState('indoor-button', this.isIndoorChecked);
    this.filterRules();
  }

  toggleIndoor4x4(): void {
    this.isIndoor4x4Checked = !this.isIndoor4x4Checked;
    this.changeToggleButtonState('indoor-4x4-button', this.isIndoor4x4Checked);
    this.filterRules();
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
