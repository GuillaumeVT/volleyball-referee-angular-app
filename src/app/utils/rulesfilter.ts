import { RulesSummary } from '../model/rules';

export class RulesFilter {

  textFilter:         string;
  isBeachChecked:     boolean;
  isIndoorChecked:    boolean;
  isIndoor4x4Checked: boolean;

  rules:         RulesSummary[];
  filteredRules: RulesSummary[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
  }

  updateRules(rules: RulesSummary[]): void {
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
    this.filterRules();
  }
}
