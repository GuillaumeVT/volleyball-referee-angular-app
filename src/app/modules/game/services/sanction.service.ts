import { Game, Sanction } from 'src/app/shared/models/game.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanctionService {

  constructor(private playerStyleService: PlayerStyleService) { }

  getSanctionIcon(sanction: Sanction): string {
    switch (sanction.card) {
      case "Y":
        return '/assets/ic_yellow_card.png';
      case "R":
        return '/assets/ic_red_card.png';
      case "RE":
        return '/assets/ic_expulsion_card.png';
      case "RD":
        return '/assets/ic_disqualification_card.png';
      case "DW":
        return '/assets/ic_delay_warning.png';
      case "DP":
        return '/assets/ic_delay_penalty.png';
      default:
        return '';
    }
  }

  getPlayerForSanction(game: Game, teamType: TeamType, player: number): string {
    switch (player) {
      case 100:
        // coach
        return 'C.';
      case 200:
        // team
        return 'T.';
      default:
        return this.playerStyleService.getPlayer(game, teamType, player);
    }
  }
}
