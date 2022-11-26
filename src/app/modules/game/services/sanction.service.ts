import { Injectable } from '@angular/core';
import { Game, Sanction } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Injectable({
  providedIn: 'root',
})
export class SanctionService {
  constructor(private _playerStyleService: PlayerStyleService) {}

  public getSanctionIcon(sanction: Sanction): string {
    switch (sanction.card) {
      case 'Y':
        return '/assets/ic_yellow_card.png';
      case 'R':
        return '/assets/ic_red_card.png';
      case 'RE':
        return '/assets/ic_expulsion_card.png';
      case 'RD':
        return '/assets/ic_disqualification_card.png';
      case 'DW':
        return '/assets/ic_delay_warning.png';
      case 'DP':
        return '/assets/ic_delay_penalty.png';
      default:
        return '';
    }
  }

  public getPlayerForSanction(game: Game, teamType: TeamType, player: number): string {
    switch (player) {
      case 100:
        // coach
        return 'C.';
      case 200:
        // team
        return 'T.';
      default:
        return this._playerStyleService.getPlayer(game, teamType, player);
    }
  }
}
