import { RulesSummary } from '@shared/models/rules.model';

export abstract class AbstractRulesFilter {
  textFilter: string;
  isBeachChecked: boolean;
  isIndoorChecked: boolean;
  isIndoor4x4Checked: boolean;
  isSnowChecked: boolean;

  rules: RulesSummary[];
  filteredRules: RulesSummary[];

  constructor() {
    this.textFilter = '';
    this.isBeachChecked = true;
    this.isIndoorChecked = true;
    this.isIndoor4x4Checked = true;
    this.isSnowChecked = true;
  }

  abstract refreshRules(): void;

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

  onRulesReceived(rules: RulesSummary[]): void {
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
    this.refreshRules();
  }
}
