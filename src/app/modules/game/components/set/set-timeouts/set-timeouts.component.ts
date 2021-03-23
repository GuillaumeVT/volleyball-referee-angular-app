import { Game } from 'src/app/shared/models/game.model';
import { Timeout } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-set-timeouts',
  templateUrl: './set-timeouts.component.html',
  styleUrls: ['./set-timeouts.component.scss']
})
export class SetTimeoutsComponent {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) { }

  getTimeouts(teamType: TeamType): Timeout[] {
    if (TeamType.Home === teamType) {
      return this.game.sets[this.setIndex].homeCalledTimeouts;
    } else {
      return this.game.sets[this.setIndex].guestCalledTimeouts;
    }
  }

  getScore(teamType: TeamType, timeout: Timeout): string {
    if (TeamType.Home === teamType) {
      return timeout.homePoints + '-' + timeout.guestPoints;
    } else {
      return timeout.guestPoints + '-' + timeout.homePoints;
    }
  }
}
