import { Game } from 'src/app/shared/models/game.model';
import { Court } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beach-court',
  templateUrl: './beach-court.component.html',
  styleUrls: ['./beach-court.component.css']
})
export class BeachCourtComponent {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) { }

  getServeVisibility(playerNumber: number, teamType: TeamType) {
    const set = this.game.sets[this.setIndex];

    var servingTeam: TeamType;
    var players: Court;

    if (set.serving === 'H') {
      servingTeam = TeamType.Home;
      players = set.homeCurrentPlayers;
    } else {
      servingTeam = TeamType.Guest;
      players = set.guestCurrentPlayers;
    }

    var visibility: string;

    if (teamType.valueOf() === servingTeam.valueOf()) {
      if (players.p1 === playerNumber) {
        visibility = 'visible';
      } else {
          visibility = 'hidden';
      }
    } else {
      visibility = 'hidden';
    }

    return visibility;
  }

}
