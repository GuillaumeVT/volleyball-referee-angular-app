import { SanctionService } from 'src/app/modules/game/services/sanction.service';
import { Game, Sanction } from 'src/app/shared/models/game.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-sanctions',
  templateUrl: './game-sanctions.component.html',
  styleUrls: ['./game-sanctions.component.css']
})
export class GameSanctionsComponent {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(public sanctionService: SanctionService, public playerStyleService: PlayerStyleService) { }

  getSanctions(teamType: TeamType): Sanction[] {
    if (TeamType.Home === teamType) {
      return this.game.homeCards;
    } else {
      return this.game.guestCards;
    }
  }

  getScore(teamType: TeamType, sanction: Sanction): string {
    const set = 'Set ' + (sanction.set + 1) + '&nbsp;&nbsp';
    if (TeamType.Home === teamType) {
      return set + sanction.homePoints + '-' + sanction.guestPoints;
    } else {
      return set + sanction.guestPoints + '-' + sanction.homePoints;
    }
  }

}
