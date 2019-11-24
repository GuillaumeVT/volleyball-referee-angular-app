import { Game } from '../../model/game';
import { TeamType } from '../../model/teamtype';
import { Player } from '../../model/team';
import { Utils } from '../../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.css']
})
export class GamePlayersComponent implements OnInit {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getPlayers(teamType: TeamType): Player[] {
    if (TeamType.Home === teamType) {
      return this.game.homeTeam.players;
    } else {
      return this.game.guestTeam.players;
    }
  }

  getLiberos(teamType: TeamType): Player[] {
    if (TeamType.Home === teamType) {
      return this.game.homeTeam.liberos;
    } else {
      return this.game.guestTeam.liberos;
    }
  }

}
