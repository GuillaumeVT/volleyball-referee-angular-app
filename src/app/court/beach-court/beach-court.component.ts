import { Game } from '../../model/game';
import { Court } from '../../model/set';
import { TeamType } from '../../model/teamtype';
import { Utils } from '../../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-beach-court',
  templateUrl: './beach-court.component.html',
  styleUrls: ['./beach-court.component.css']
})
export class BeachCourtComponent implements OnInit {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

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

    var visibility;

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
