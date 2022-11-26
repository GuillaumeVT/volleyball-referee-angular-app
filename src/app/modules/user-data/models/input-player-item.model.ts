import { IndoorPlayerItem } from '@game/models/indoor-player-item.model';

export class InputPlayerItem extends IndoorPlayerItem {
  shirtNumber: number;
  selected: boolean;
  unselectedColor: string;
  unselectedBackgroundColor: string;
  unselectedBorderColor: string;

  constructor(
    player: number,
    color: string,
    backgroundColor: string,
    borderColor: string,
    captain: boolean,
    unselectedColor: string,
    unselectedBackgroundColor: string,
    unselectedBorderColor: string,
  ) {
    super(player, color, backgroundColor, borderColor, captain);
    this.shirtNumber = player;
    this.selected = false;
    this.unselectedColor = unselectedColor;
    this.unselectedBackgroundColor = unselectedBackgroundColor;
    this.unselectedBorderColor = unselectedBorderColor;
  }

  public getColor(): string {
    if (this.selected) {
      return this.color;
    } else {
      return this.unselectedColor;
    }
  }

  public getBackgroundColor(): string {
    if (this.selected) {
      return this.backgroundColor;
    } else {
      return this.unselectedBackgroundColor;
    }
  }

  public getBorderColor(): string {
    if (this.selected) {
      return this.borderColor;
    } else {
      return this.unselectedBorderColor;
    }
  }
}
