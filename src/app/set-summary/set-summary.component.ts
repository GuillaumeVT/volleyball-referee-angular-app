import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-set-summary',
  templateUrl: './set-summary.component.html',
  styleUrls: ['./set-summary.component.css']
})
export class SetSummaryComponent implements OnInit, OnChanges {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  hPoints:   number;
  gPoints:   number;
  duration:  string;
  hTimeouts: number[];
  gTimeouts: number[];

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets) {
      this.hPoints = this.game.sets[this.setIndex].hPoints;
      this.gPoints = this.game.sets[this.setIndex].gPoints;
      this.duration = ` ${Math.ceil(this.game.sets[this.setIndex].duration / 60000)} min`;

      this.hTimeouts = [];
      this.gTimeouts = [];
      var index;
      for (index = 0; index < this.game.sets[this.setIndex].hTimeouts; index++) {
        this.hTimeouts.push(1);
      }
      for (index = 0; index < this.game.sets[this.setIndex].gTimeouts; index++) {
        this.gTimeouts.push(1);
      }
    }
  }

  getPoints(teamType: TeamType): number {
    var points;

    if (TeamType.Home === teamType) {
      points = this.hPoints;
    } else {
      points = this.gPoints;
    }

    return points;
  }

  getTimeouts(teamType: TeamType): number {
    var timeouts;

    if (TeamType.Home === teamType) {
      timeouts = this.hTimeouts;
    } else {
      timeouts = this.gTimeouts;
    }

    return timeouts;
  }

}
