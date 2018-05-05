import { GameService } from '../game.service';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { TeamType } from '../model/teamtype';
import { IndoorPlayerItem } from '../model/indoor-player-item';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-indoor-court',
  templateUrl: './indoor-court.component.html',
  styleUrls: ['./indoor-court.component.css']
})
export class IndoorCourtComponent implements OnInit, OnChanges {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;
  @Input() positions: number;

  hPlayerItems: IndoorPlayerItem[];
  gPlayerItems: IndoorPlayerItem[];

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

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
    var index;

    for (index = 0; index < this.positions; index++) {
      var position = index + 1;
      var player = this.getPlayerAt(position, teamType);
      var color, backgroundColor;

      if (this.utils.isLibero(this.game, teamType, player)) {
        color = this.utils.getLiberoTextColor(this.game, teamType);
        backgroundColor = this.utils.getLiberoBackgroundColor(this.game, teamType);
      }
      else {
        color = this.utils.getTeamTextColor(this.game, teamType);
        backgroundColor = this.utils.getTeamBackgroundColor(this.game, teamType);
      }

      var actingCaptain;
      const set = this.game.sets[this.setIndex];

      if (TeamType.Home === teamType) {
        actingCaptain = set.hCaptain;
      } else {
        actingCaptain = set.gCaptain;
      }

      var playerItem = new IndoorPlayerItem(player, color, backgroundColor, actingCaptain === player);
      playerItems.push(playerItem);
    }

    return playerItems;
  }

  getPlayerItem(position: number, teamType: TeamType): IndoorPlayerItem {
    var index = position - 1;
    var playerItem;

    if (TeamType.Home === teamType) {
      playerItem = this.hPlayerItems[index];
    } else {
      playerItem = this.gPlayerItems[index];
    }

    return playerItem;
  }

  getPlayerText(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).player;
  }

  getPlayerFrontColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).color;
  }

  getPlayerBackColor(position: number, teamType: TeamType): string {
    return this.getPlayerItem(position, teamType).backgroundColor;
  }

  getPlayerAt(position: number, teamType: TeamType) {
    const set = this.game.sets[this.setIndex];

    var players: Player[];

    switch (teamType) {
      case TeamType.Home:
        players = set.hCurrentPlayers;
        break;
      case TeamType.Guest:
        players = set.gCurrentPlayers;
        break;
    }

    var playerNumber = 0;

    for (let player of players) {
      if (player.pos === position) {
        playerNumber = player.num;
      }
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

    var visibility;

    if (teamType.valueOf() === servingTeam.valueOf()) {
      visibility = 'visible';
    } else {
      visibility = 'hidden';
    }

    return visibility;
  }

}
