import { RulesSummary } from '@shared/models/rules.model';

export abstract class AbstractRulesFilter {
  private _textFilter: string;
  private _isBeachChecked: boolean;
  private _isIndoorChecked: boolean;
  private _isIndoor4x4Checked: boolean;
  private _isSnowChecked: boolean;

  public rules: RulesSummary[];
  public filteredRules: RulesSummary[];

  constructor() {
    this._textFilter = '';
    this._isBeachChecked = true;
    this._isIndoorChecked = true;
    this._isIndoor4x4Checked = true;
    this._isSnowChecked = true;
  }

  abstract refreshRules(): void;

  protected getKinds(): string[] {
    const kinds: string[] = [];
    if (this._isBeachChecked) {
      kinds.push('BEACH');
    }
    if (this._isIndoorChecked) {
      kinds.push('INDOOR');
    }
    if (this._isIndoor4x4Checked) {
      kinds.push('INDOOR_4X4');
    }
    if (this._isSnowChecked) {
      kinds.push('SNOW');
    }
    return kinds;
  }

  protected onRulesReceived(rules: RulesSummary[]): void {
    this.rules = rules;
    this.filterRules();
  }

  protected filterRules(): void {
    var tempList = [];

    for (let rules of this.rules) {
      var mustAdd = true;

      if (this._textFilter.trim()) {
        if (rules.name.toLowerCase().indexOf(this._textFilter) === -1) {
          mustAdd = false;
        }
      }

      if (mustAdd) {
        tempList.push(rules);
      }
    }

    this.filteredRules = tempList;
  }

  public filterFromText(textFilter: HTMLInputElement): void {
    this._textFilter = textFilter.value.toLowerCase();
    this.filterRules();
  }

  public toggleBeach(button: HTMLElement): void {
    this._isBeachChecked = !this._isBeachChecked;
    this.toggleButton(button, this._isBeachChecked, 'vbr-beach-chip');
  }

  public toggleIndoor(button: HTMLElement): void {
    this._isIndoorChecked = !this._isIndoorChecked;
    this.toggleButton(button, this._isIndoorChecked, 'vbr-indoor-chip');
  }

  public toggleIndoor4x4(button: HTMLElement): void {
    this._isIndoor4x4Checked = !this._isIndoor4x4Checked;
    this.toggleButton(button, this._isIndoor4x4Checked, 'vbr-indoor-4x4-chip');
  }

  public toggleSnow(button: HTMLElement): void {
    this._isSnowChecked = !this._isSnowChecked;
    this.toggleButton(button, this._isSnowChecked, 'vbr-snow-chip');
  }

  private toggleButton(button: HTMLElement, selected: boolean, clazz: string): void {
    if (selected) {
      button.classList.add(clazz);
    } else {
      button.classList.remove(clazz);
    }
    this.refreshRules();
  }
}
