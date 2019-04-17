import { Game } from '../../model/game';
import { TeamType } from '../../model/teamtype';
import { Utils } from '../../utils/utils';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-time-game-summary',
  templateUrl: './time-game-summary.component.html',
  styleUrls: ['./time-game-summary.component.css']
})
export class TimeGameSummaryComponent implements OnInit, OnChanges {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  @Output() teamsSwapped = new EventEmitter();

  homePoints:   number;
  guestPoints:   number;
  remainingTime:     number;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets) {
      this.homePoints = this.game.sets[0].homePoints;
      this.guestPoints = this.game.sets[0].guestPoints;
      this.remainingTime = this.game.sets[0].remainingTime;
    }
  }

  getTeamName(teamType: TeamType): string {
    var name;

    if (TeamType.Home === teamType) {
      name = this.game.homeTeam.name;
    } else {
      name = this.game.guestTeam.name;
    }

    return name;
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

  swapTeams(): void {
    this.teamsSwapped.emit();
  }

}
