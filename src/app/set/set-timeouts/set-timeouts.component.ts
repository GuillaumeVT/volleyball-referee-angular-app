import { Game } from '../../model/game';
import { Timeout } from '../../model/set';
import { TeamType } from '../../model/teamtype';
import { Utils } from '../../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set-timeouts',
  templateUrl: './set-timeouts.component.html',
  styleUrls: ['./set-timeouts.component.css']
})
export class SetTimeoutsComponent implements OnInit {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

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
