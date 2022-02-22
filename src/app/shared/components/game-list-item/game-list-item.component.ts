import { GameSummary } from 'src/app/shared/models/game.model';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
})
export class GameListItemComponent implements OnChanges {
  @Input() gameSummary: GameSummary;
  @Input() inLeague: boolean;

  homeScores: number[];
  guestScores: number[];

  constructor() {}

  ngOnChanges(_changes: SimpleChanges) {
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

  getMatchUrl(): string {
    return `/view/game/${this.gameSummary.id}`;
  }

  getLeagueUrl(): string {
    return `/view/league/${this.gameSummary.leagueId}`;
  }

  getSearchUrl(): string {
    return '/search';
  }

  getSearchParams() {
    return { type: 'token', value: this.gameSummary.refereeName };
  }

  showLeague(): boolean {
    return !this.inLeague && this.gameSummary.leagueId && this.gameSummary.leagueId.length > 0;
  }

  showDivision(): boolean {
    return this.gameSummary.divisionName && this.gameSummary.divisionName.length > 0;
  }

  showReferee(): boolean {
    return this.gameSummary.refereeName && this.gameSummary.refereeName.length > 0;
  }
}
