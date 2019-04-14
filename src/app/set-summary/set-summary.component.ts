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

  homePoints:   number;
  guestPoints:   number;
  duration:  string;
  homeTimeouts: number[];
  guestTimeouts: number[];

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets) {
      this.homePoints = this.game.sets[this.setIndex].homePoints;
      this.guestPoints = this.game.sets[this.setIndex].guestPoints;
      this.duration = ` ${Math.ceil(this.game.sets[this.setIndex].duration / 60000)} min`;

      this.homeTimeouts = [];
      this.guestTimeouts = [];
      var index;
      for (index = 0; index < this.game.sets[this.setIndex].homeTimeouts; index++) {
        this.homeTimeouts.push(1);
      }
      for (index = 0; index < this.game.sets[this.setIndex].guestTimeouts; index++) {
        this.guestTimeouts.push(1);
      }
    }
  }

  getPoints(teamType: TeamType): number {
    var points;

    if (TeamType.Home === teamType) {
      points = this.homePoints;
    } else {
      points = this.guestPoints;
    }

    return points;
  }

  getTimeouts(teamType: TeamType): number {
    var timeouts;

    if (TeamType.Home === teamType) {
      timeouts = this.homeTimeouts;
    } else {
      timeouts = this.guestTimeouts;
    }

    return timeouts;
  }

}
