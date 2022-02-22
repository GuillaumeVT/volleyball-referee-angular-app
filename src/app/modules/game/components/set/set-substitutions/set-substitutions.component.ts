import { Component, Input } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { Substitution } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-set-substitutions',
  templateUrl: './set-substitutions.component.html',
  styleUrls: ['./set-substitutions.component.scss'],
})
export class SetSubstitutionsComponent {
  @Input() game: Game;
  @Input() setIndex: number;
  @Input() leftTeam: TeamType;
  @Input() rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) {}

  getSubstitutions(teamType: TeamType): Substitution[] {
    if (TeamType.Home === teamType) {
      return this.game.sets[this.setIndex].homeSubstitutions;
    } else {
      return this.game.sets[this.setIndex].guestSubstitutions;
    }
  }

  getScore(teamType: TeamType, substitution: Substitution): string {
    if (TeamType.Home === teamType) {
      return substitution.homePoints + '-' + substitution.guestPoints;
    } else {
      return substitution.guestPoints + '-' + substitution.homePoints;
    }
  }
}
