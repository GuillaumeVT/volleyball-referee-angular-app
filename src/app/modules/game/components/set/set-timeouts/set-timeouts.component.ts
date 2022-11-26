import { Component, Input } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { Timeout } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-set-timeouts',
  templateUrl: './set-timeouts.component.html',
  styleUrls: ['./set-timeouts.component.scss'],
})
export class SetTimeoutsComponent {
  @Input() public game: Game;
  @Input() public setIndex: number;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;

  constructor(public playerStyleService: PlayerStyleService) {}

  public getTimeouts(teamType: TeamType): Timeout[] {
    if (TeamType.Home === teamType) {
      return this.game.sets[this.setIndex].homeCalledTimeouts;
    } else {
      return this.game.sets[this.setIndex].guestCalledTimeouts;
    }
  }

  public getScore(teamType: TeamType, timeout: Timeout): string {
    if (TeamType.Home === teamType) {
      return timeout.homePoints + '-' + timeout.guestPoints;
    } else {
      return timeout.guestPoints + '-' + timeout.homePoints;
    }
  }
}
