import { Component, Input } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { Court } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-beach-court',
  templateUrl: './beach-court.component.html',
  styleUrls: ['./beach-court.component.scss'],
})
export class BeachCourtComponent {
  @Input() public game: Game;
  @Input() public setIndex: number;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) {}

  public getServeVisibility(playerNumber: number, teamType: TeamType): string {
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
