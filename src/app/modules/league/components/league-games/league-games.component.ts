import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { League } from '@shared/models/league.model';
import { TeamSummary } from '@shared/models/team.model';
import { idAll } from '@shared/models/variable.model';
import { PublicService } from '@shared/services/public.service';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-league-games',
  templateUrl: './league-games.component.html',
  styleUrls: ['./league-games.component.scss'],
})
export class LeagueGamesComponent implements OnDestroy, OnChanges {
  public selectedDivision: string;
  public allDivisions: string;
  public selectedTeam: TeamSummary;
  public allTeams: TeamSummary;
  public teams: TeamSummary[];

  private _subscription: Subscription;
  private _autoRefresh: boolean;

  @Input() public league: League;

  constructor(private _publicService: PublicService) {
    this.allDivisions = idAll;
    this.selectedDivision = this.allDivisions;
    this.allTeams = { id: idAll, name: idAll, kind: null, gender: null, createdBy: null, createdAt: null, updatedAt: null };
    this.teams = [];
    this.selectedTeam = this.allTeams;
    this._autoRefresh = true;
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.league) {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      this._subscription = timer(0, 120000)
        .pipe(takeWhile(() => this._autoRefresh))
        .subscribe(() => this.refreshTeams());
    }
  }

  public ngOnDestroy(): void {
    this._autoRefresh = false;
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private refreshTeams(): void {
    if (this.selectedDivision === this.allDivisions) {
      this._publicService.listTeamsOfLeague(this.league.id).subscribe({
        next: (teams) => (this.teams = teams),
        error: (_) => (this.teams = []),
      });
    } else {
      this._publicService.listTeamsOfDivision(this.league.id, this.selectedDivision).subscribe({
        next: (teams) => (this.teams = teams),
        error: (_) => (this.teams = []),
      });
    }
  }

  public onDivisionSelected(): void {
    this.refreshTeams();
  }
}
