import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-time-game-summary',
  templateUrl: './time-game-summary.component.html',
  styleUrls: ['./time-game-summary.component.css']
})
export class TimeGameSummaryComponent implements OnInit, OnChanges {

  @Input() date:      number;
  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  @Output() teamsSwapped = new EventEmitter();

  hPoints:   number;
  gPoints:   number;
  rTime:     number;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets) {
      this.hPoints = this.game.sets[0].hPoints;
      this.gPoints = this.game.sets[0].gPoints;
      this.rTime = this.game.sets[0].rTime;
    }
  }

  getTeamName(teamType: TeamType): string {
    var name;

    if (TeamType.Home === teamType) {
      name = this.game.hTeam.name;
    } else {
      name = this.game.gTeam.name;
    }

    return name;
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

  swapTeams(): void {
    this.teamsSwapped.emit();
  }

}
