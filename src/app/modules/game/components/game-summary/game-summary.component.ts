import { Game } from 'src/app/shared/models/game.model';
import { Set } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.scss'],
})
export class GameSummaryComponent implements OnChanges {
  @Input() game: Game;
  @Input() leftTeam: TeamType;
  @Input() rightTeam: TeamType;

  @Output() teamsSwapped = new EventEmitter();

  leftTeamName: string;
  rightTeamName: string;
  leftTeamSets: number;
  rightTeamSets: number;
  fullScore: string;

  constructor(public playerStyleService: PlayerStyleService) {
    this.leftTeamName = '';
    this.rightTeamName = '';
    this.leftTeamSets = 0;
    this.rightTeamSets = 0;
    this.fullScore = '';
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.game) {
      this.init();
    }
  }

  init(): void {
    this.leftTeamName = this.getTeamName(this.leftTeam);
    this.rightTeamName = this.getTeamName(this.rightTeam);
    this.leftTeamSets = this.getTeamSets(this.leftTeam);
    this.rightTeamSets = this.getTeamSets(this.rightTeam);

    this.fullScore = this.game.sets
      .map((set) => `${this.getScore(set, this.leftTeam)}-${this.getScore(set, this.rightTeam)}`)
      .join('&emsp;');
  }

  private getScore(set: Set, teamType: TeamType): number {
    var score: number;

    if (TeamType.Home === teamType) {
      score = set.homePoints;
    } else {
      score = set.guestPoints;
    }

    return score;
  }

  getTeamName(teamType: TeamType): string {
    var name: string;

    if (TeamType.Home === teamType) {
      name = this.game.homeTeam.name;
    } else {
      name = this.game.guestTeam.name;
    }

    return name;
  }

  getTeamSets(teamType: TeamType): number {
    var sets: number;

    if (TeamType.Home === teamType) {
      sets = this.game.homeSets;
    } else {
      sets = this.game.guestSets;
    }

    return sets;
  }

  swapTeams(): void {
    this.teamsSwapped.emit();
  }
}
