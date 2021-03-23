import { IndoorPlayerItem } from 'src/app/modules/game/models/indoor-player-item.model';
import { Game } from 'src/app/shared/models/game.model';
import { Court } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-indoor-court',
  templateUrl: './indoor-court.component.html',
  styleUrls: ['./indoor-court.component.scss']
})
export class IndoorCourtComponent implements OnChanges {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;
  @Input() positions: number;

  hPlayerItems: IndoorPlayerItem[];
  gPlayerItems: IndoorPlayerItem[];

  constructor(private playerStyleService: PlayerStyleService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets) {
      this.updatePlayerItems();
    }
  }

  updatePlayerItems(): void {
    this.hPlayerItems = this.computePlayerItems(TeamType.Home);
    this.gPlayerItems = this.computePlayerItems(TeamType.Guest);
  }

  computePlayerItems(teamType: TeamType): IndoorPlayerItem[] {
    var playerItems = [];

    for (let index = 0; index < this.positions; index++) {
      var position = index + 1;
      var player = this.getPlayerAt(position, teamType);
      var color : string, backgroundColor : string, borderColor : string;

      if (this.playerStyleService.isLibero(this.game, teamType, player)) {
        color = this.playerStyleService.getLiberoTextColor(this.game, teamType);
        backgroundColor = this.playerStyleService.getLiberoBackgroundColor(this.game, teamType);
        borderColor = this.playerStyleService.getBorderColor(backgroundColor);
      }
      else {
        color = this.playerStyleService.getTeamTextColor(this.game, teamType);
        backgroundColor = this.playerStyleService.getTeamBackgroundColor(this.game, teamType);
        borderColor = this.playerStyleService.getBorderColor(backgroundColor);
      }

      var actingCaptain: number;
      const set = this.game.sets[this.setIndex];

      if (TeamType.Home === teamType) {
        actingCaptain = set.homeCaptain;
      } else {
        actingCaptain = set.guestCaptain;
      }

      var playerItem = new IndoorPlayerItem(player, color, backgroundColor, borderColor, (actingCaptain >= 0 && actingCaptain === player));
      playerItems.push(playerItem);
    }
    return playerItems;
  }

  getPlayerItem(position: number, teamType: TeamType): IndoorPlayerItem {
    var index = position - 1;
    var playerItem: IndoorPlayerItem;

    if (TeamType.Home === teamType) {
      playerItem = this.hPlayerItems[index];
    } else {
      playerItem = this.gPlayerItems[index];
    }

    return playerItem;
  }

  getPlayerText(position: number, teamType: TeamType): string {
    var player: string = this.getPlayerItem(position, teamType).player;

    if (player === '-1') {
      player = '_';
    }

    return player;
  }

  getPlayerForegroundColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).color;
  }

  getPlayerBackgroundColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).backgroundColor;
  }

  getPlayerBorderColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).borderColor;
  }

  getPlayerAt(position: number, teamType: TeamType) {
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

  getServeVisibility(teamType: TeamType) {
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
