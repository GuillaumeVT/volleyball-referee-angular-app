import { Component, Input } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';
import { Player } from '@shared/models/team.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.scss'],
})
export class GamePlayersComponent {
  @Input() game: Game;
  @Input() leftTeam: TeamType;
  @Input() rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) {}

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
