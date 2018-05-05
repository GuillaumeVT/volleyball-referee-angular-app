import { Game } from '../model/game';
import { Player } from '../model/player';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set-lineups',
  templateUrl: './set-lineups.component.html',
  styleUrls: ['./set-lineups.component.css']
})
export class SetLineupsComponent implements OnInit {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getPlayerAt(teamType: TeamType, position: number): string {
    const set = this.game.sets[this.setIndex];

    var players: Player[];
    var captain;

    if (TeamType.Home === teamType) {
      players = set.hStartingPlayers;
      captain = this.game.hTeam.captain;
    } else {
      players = set.gStartingPlayers;
      captain = this.game.gTeam.captain;
    }

    var playerNumber = 0;

    for (let player of players) {
      if (player.pos === position) {
        playerNumber = player.num;
      }
    }

    var playerNumberStr = String(playerNumber);

    if (playerNumber === captain) {
      playerNumberStr = '<u>' + playerNumberStr + '</u>';
    }

    return playerNumberStr;
  }

}
