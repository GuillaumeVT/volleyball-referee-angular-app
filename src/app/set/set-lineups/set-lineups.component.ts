import { Game } from '../../model/game';
import { Court } from '../../model/court';
import { TeamType } from '../../model/teamtype';
import { Utils } from '../../utils/utils';
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

    var players: Court;
    var captain;

    if (TeamType.Home === teamType) {
      players = set.homeStartingPlayers;
      captain = this.game.homeTeam.captain;
    } else {
      players = set.guestStartingPlayers;
      captain = this.game.guestTeam.captain;
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

    var playerNumberStr = String(playerNumber);

    if (playerNumber === captain) {
      playerNumberStr = '<u>' + playerNumberStr + '</u>';
    }

    if (playerNumber === -1) {
      playerNumberStr = '_';
    }

    return playerNumberStr;
  }

}
