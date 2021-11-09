import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { GameSummary, LeagueDashboard } from 'src/app/shared/models/game.model';
import { League } from 'src/app/shared/models/league.model';
import { PublicService } from 'src/app/shared/services/public.service';

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { idAll } from 'src/app/shared/models/variable.model';

@Component({
  selector: 'app-league-dashboard',
  templateUrl: './league-dashboard.component.html',
  styleUrls: ['./league-dashboard.component.scss']
})
export class LeagueDashboardComponent implements OnDestroy, OnChanges {

  @Input() league: League;

  selectedDivision: string;
  allDivisions:     string;
  games:            LeagueDashboard;
  subscription:     Subscription;
  autoRefresh:      boolean;

  constructor(private publicService: PublicService) {
    this.allDivisions = idAll;
    this.selectedDivision = this.allDivisions;
    this.autoRefresh = true;
  }

  ngOnChanges(_changes: SimpleChanges) {
    if (this.league) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, 120000).pipe(takeWhile(() => this.autoRefresh)).subscribe(() => this.refreshGames());
    }
  }

  ngOnDestroy() {
    this.autoRefresh = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshGames(): void {
    if (this.selectedDivision === this.allDivisions) {
      this.publicService.getGamesInLeagueGroupedByStatus(this.league.id).subscribe(games => this.games = games, _error => this.games = null);
    } else {
      this.publicService.getGamesInDivisionGroupedByStatus(this.league.id, this.selectedDivision).subscribe(games => this.games = games, _error => this.games = null);
    }
  }

  onDivisionSelected(): void {
    this.refreshGames();
  }

}
