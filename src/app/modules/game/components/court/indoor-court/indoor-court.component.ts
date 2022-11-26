import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndoorPlayerItem } from '@game/models/indoor-player-item.model';
import { Game } from '@shared/models/game.model';
import { Court } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-indoor-court',
  templateUrl: './indoor-court.component.html',
  styleUrls: ['./indoor-court.component.scss'],
})
export class IndoorCourtComponent implements OnChanges {
  @Input() public game: Game;
  @Input() public setIndex: number;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;
  @Input() public positions: number;

  private _hPlayerItems: IndoorPlayerItem[];
  private _gPlayerItems: IndoorPlayerItem[];

  constructor(private _playerStyleService: PlayerStyleService) {}

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.game && this.game.sets) {
      this.updatePlayerItems();
    }
  }

  private updatePlayerItems(): void {
    this._hPlayerItems = this.computePlayerItems(TeamType.Home);
    this._gPlayerItems = this.computePlayerItems(TeamType.Guest);
  }

  private computePlayerItems(teamType: TeamType): IndoorPlayerItem[] {
    const playerItems = [];

    for (let index = 0; index < this.positions; index++) {
      const position = index + 1;
      const player = this.getPlayerAt(position, teamType);
      var color: string, backgroundColor: string, borderColor: string;

      if (this._playerStyleService.isLibero(this.game, teamType, player)) {
        color = this._playerStyleService.getLiberoTextColor(this.game, teamType);
        backgroundColor = this._playerStyleService.getLiberoBackgroundColor(this.game, teamType);
        borderColor = this._playerStyleService.getBorderColor(backgroundColor);
      } else {
        color = this._playerStyleService.getTeamTextColor(this.game, teamType);
        backgroundColor = this._playerStyleService.getTeamBackgroundColor(this.game, teamType);
        borderColor = this._playerStyleService.getBorderColor(backgroundColor);
      }

      var actingCaptain: number;
      const set = this.game.sets[this.setIndex];

      if (TeamType.Home === teamType) {
        actingCaptain = set.homeCaptain;
      } else {
        actingCaptain = set.guestCaptain;
      }

      const playerItem = new IndoorPlayerItem(player, color, backgroundColor, borderColor, actingCaptain >= 0 && actingCaptain === player);
      playerItems.push(playerItem);
    }
    return playerItems;
  }

  private getPlayerItem(position: number, teamType: TeamType): IndoorPlayerItem {
    var index = position - 1;
    var playerItem: IndoorPlayerItem;

    if (TeamType.Home === teamType) {
      playerItem = this._hPlayerItems[index];
    } else {
      playerItem = this._gPlayerItems[index];
    }

    return playerItem;
  }

  public getPlayerText(position: number, teamType: TeamType): string {
    var player: string = this.getPlayerItem(position, teamType).player;

    if (player === '-1') {
      player = '_';
    }

    return player;
  }

  public getPlayerForegroundColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).color;
  }

  public getPlayerBackgroundColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).backgroundColor;
  }

  public getPlayerBorderColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).borderColor;
  }

  private getPlayerAt(position: number, teamType: TeamType) {
    const set = this.game.sets[this.setIndex];

    var players: Court;

    switch (teamType) {
      case TeamType.Home:
        players = set.homeCurrentPlayers;
        break;
      case TeamType.Guest:
        players = set.guestCurrentPlayers;
        break;
    }

    var playerNumber = -1;

    switch (position) {
      case 1:
        playerNumber = players.p1;
        break;
      case 2:
        playerNumber = players.p2;
        break;
      case 3:
        playerNumber = players.p3;
        break;
      case 4:
        playerNumber = players.p4;
        break;
      case 5:
        playerNumber = players.p5;
        break;
      case 6:
        playerNumber = players.p6;
        break;
    }

    return playerNumber;
  }

  public getServeVisibility(teamType: TeamType) {
    const set = this.game.sets[this.setIndex];

    var servingTeam: TeamType;

    if (set.serving === 'H') {
      servingTeam = TeamType.Home;
    } else {
      servingTeam = TeamType.Guest;
    }

    var visibility: string;

    if (teamType.valueOf() === servingTeam.valueOf()) {
      visibility = 'visible';
    } else {
      visibility = 'hidden';
    }

    return visibility;
  }
}
