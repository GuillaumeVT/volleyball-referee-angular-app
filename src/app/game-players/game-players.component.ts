import { Game } from '../model/game';
import { Substitution } from '../model/substitution';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
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

  getPlayers(teamType: TeamType): number[] {
    if (TeamType.Home === teamType) {
      return this.game.hTeam.players;
    } else {
      return this.game.gTeam.players;
    }
  }

  getLiberos(teamType: TeamType): number[] {
    if (TeamType.Home === teamType) {
      return this.game.hTeam.liberos;
    } else {
      return this.game.gTeam.liberos;
    }
  }

}
