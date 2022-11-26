import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { LeagueDashboard } from '@shared/models/game.model';
import { League } from '@shared/models/league.model';
import { idAll } from '@shared/models/variable.model';
import { PublicService } from '@shared/services/public.service';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-league-dashboard',
  templateUrl: './league-dashboard.component.html',
  styleUrls: ['./league-dashboard.component.scss'],
})
export class LeagueDashboardComponent implements OnDestroy, OnChanges {
  @Input() public league: League;

  public selectedDivision: string;
  public allDivisions: string;
  public games: LeagueDashboard;
  private _subscription: Subscription;
  private _autoRefresh: boolean;

  constructor(private _publicService: PublicService) {
    this.allDivisions = idAll;
    this.selectedDivision = this.allDivisions;
    this._autoRefresh = true;
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.league) {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      this._subscription = timer(0, 120000)
        .pipe(takeWhile(() => this._autoRefresh))
        .subscribe(() => this.refreshGames());
    }
  }

  public ngOnDestroy(): void {
    this._autoRefresh = false;
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private refreshGames(): void {
    if (this.selectedDivision === this.allDivisions) {
      this._publicService.getGamesInLeagueGroupedByStatus(this.league.id).subscribe({
        next: (games) => (this.games = games),
        error: (_) => (this.games = null),
      });
    } else {
      this._publicService.getGamesInDivisionGroupedByStatus(this.league.id, this.selectedDivision).subscribe({
        next: (games) => (this.games = games),
        error: (_) => (this.games = null),
      });
    }
  }

  public onDivisionSelected(): void {
    this.refreshGames();
  }
}
