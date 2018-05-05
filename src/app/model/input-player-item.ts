import { IndoorPlayerItem } from './indoor-player-item';

export class InputPlayerItem extends IndoorPlayerItem {
  shirtNumber:               number;
  selected:                  boolean;
  unselectedColor:           string;
  unselectedBackgroundColor: string;

  constructor(player: number, color: string, backgroundColor: string, captain: boolean, unselectedColor: string, unselectedBackgroundColor) {
    super(player, color, backgroundColor, captain);
    this.shirtNumber = player;
    this.selected = false;
    this.unselectedColor = unselectedColor;
    this.unselectedBackgroundColor = unselectedBackgroundColor;
  }

  getColor(): string {
    if (this.selected) {
      return this.color;
    }
    else {
      return this.unselectedColor;
    }
  }

  getBackgroundColor(): string {
    if (this.selected) {
      return this.backgroundColor;
    }
    else {
      return this.unselectedBackgroundColor;
    }
  }
}
