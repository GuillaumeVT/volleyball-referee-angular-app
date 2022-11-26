import { Component, Input } from '@angular/core';
import { SanctionService } from '@game/services/sanction.service';
import { Game, Sanction } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-game-sanctions',
  templateUrl: './game-sanctions.component.html',
  styleUrls: ['./game-sanctions.component.scss'],
})
export class GameSanctionsComponent {
  @Input() public game: Game;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;

  constructor(public sanctionService: SanctionService, public playerStyleService: PlayerStyleService) {}

  public getSanctions(teamType: TeamType): Sanction[] {
    if (TeamType.Home === teamType) {
      return this.game.homeCards;
    } else {
      return this.game.guestCards;
    }
  }

  public getScore(teamType: TeamType, sanction: Sanction): string {
    const set = 'Set ' + (sanction.set + 1) + '&nbsp;&nbsp';
    if (TeamType.Home === teamType) {
      return set + sanction.homePoints + '-' + sanction.guestPoints;
    } else {
      return set + sanction.guestPoints + '-' + sanction.homePoints;
    }
  }
}
