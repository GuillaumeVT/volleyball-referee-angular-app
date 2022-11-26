import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { Set } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.scss'],
})
export class GameSummaryComponent implements OnChanges {
  @Input() public game: Game;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;

  @Output() public teamsSwapped = new EventEmitter();

  public leftTeamName: string;
  public rightTeamName: string;
  public leftTeamSets: number;
  public rightTeamSets: number;
  public fullScore: string;

  constructor(public playerStyleService: PlayerStyleService) {
    this.leftTeamName = '';
    this.rightTeamName = '';
    this.leftTeamSets = 0;
    this.rightTeamSets = 0;
    this.fullScore = '';
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.game) {
      this.init();
    }
  }

  private init(): void {
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

  private getTeamName(teamType: TeamType): string {
    var name: string;

    if (TeamType.Home === teamType) {
      name = this.game.homeTeam.name;
    } else {
      name = this.game.guestTeam.name;
    }

    return name;
  }

  private getTeamSets(teamType: TeamType): number {
    var sets: number;

    if (TeamType.Home === teamType) {
      sets = this.game.homeSets;
    } else {
      sets = this.game.guestSets;
    }

    return sets;
  }

  public swapTeams(): void {
    this.teamsSwapped.emit();
  }
}
