import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameSummary } from '@shared/models/game.model';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
})
export class GameListItemComponent implements OnChanges {
  @Input() public gameSummary: GameSummary;
  @Input() public inLeague: boolean;

  public homeScores: number[];
  public guestScores: number[];

  constructor() {}

  public ngOnChanges(_changes: SimpleChanges): void {
    this.homeScores = [];
    this.guestScores = [];

    if (this.gameSummary && this.gameSummary.status !== 'SCHEDULED') {
      const sets: string[] = this.gameSummary.score.split('\t\t');
      for (let set of sets) {
        const score: string[] = set.split('-');
        this.homeScores.push(Number(score[0]));
        this.guestScores.push(Number(score[1]));
      }
    }
  }

  public getMatchUrl(): string {
    return `/view/game/${this.gameSummary.id}`;
  }

  public getLeagueUrl(): string {
    return `/view/league/${this.gameSummary.leagueId}`;
  }

  public getSearchUrl(): string {
    return '/search';
  }

  public getSearchParams() {
    return { type: 'token', value: this.gameSummary.refereeName };
  }

  public showLeague(): boolean {
    return !this.inLeague && this.gameSummary.leagueId && this.gameSummary.leagueId.length > 0;
  }

  public showDivision(): boolean {
    return this.gameSummary.divisionName && this.gameSummary.divisionName.length > 0;
  }

  public showReferee(): boolean {
    return this.gameSummary.refereeName && this.gameSummary.refereeName.length > 0;
  }
}
