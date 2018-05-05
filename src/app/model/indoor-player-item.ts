export class IndoorPlayerItem {
  player:          string;
  color:           string;
  backgroundColor: string;
  captain:         boolean;

  constructor(player: number, color: string, backgroundColor: string, captain: boolean) {
    this.captain = captain;
    if (captain) {
      this.player = '<u>' + player + '</u>';
    } else {
      this.player = String(player);
    }

    this.color = color;
    this.backgroundColor = backgroundColor;
  }
}
