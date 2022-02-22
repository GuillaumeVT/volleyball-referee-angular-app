import { Game } from 'src/app/shared/models/game.model';
import { Court } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Directive, Input } from '@angular/core';

@Directive()
export abstract class AbstractSetLineupsComponent {
  @Input() game: Game;
  @Input() setIndex: number;
  @Input() leftTeam: TeamType;
  @Input() rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) {}

  getPlayerAt(teamType: TeamType, position: number): string {
    const set = this.game.sets[this.setIndex];

    var players: Court;
    var captain: number;

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
