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
  selectedDivision: string;
  allDivisions: string;
  selectedTeam: TeamSummary;
  allTeams: TeamSummary;
  teams: TeamSummary[];

  subscription: Subscription;
  autoRefresh: boolean;

  @Input() league: League;

  constructor(private publicService: PublicService) {
    this.allDivisions = idAll;
    this.selectedDivision = this.allDivisions;
    this.allTeams = { id: idAll, name: idAll, kind: null, gender: null, createdBy: null, createdAt: null, updatedAt: null };
    this.teams = [];
    this.selectedTeam = this.allTeams;
    this.autoRefresh = true;
  }

  ngOnChanges(_changes: SimpleChanges) {
    if (this.league) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, 120000)
        .pipe(takeWhile(() => this.autoRefresh))
        .subscribe(() => this.refreshTeams());
    }
  }

  ngOnDestroy() {
    this.autoRefresh = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshTeams(): void {
    if (this.selectedDivision === this.allDivisions) {
      this.publicService.listTeamsOfLeague(this.league.id).subscribe({
        next: (teams) => (this.teams = teams),
        error: (_) => (this.teams = []),
      });
    } else {
      this.publicService.listTeamsOfDivision(this.league.id, this.selectedDivision).subscribe({
        next: (teams) => (this.teams = teams),
        error: (_) => (this.teams = []),
      });
    }
  }

  onDivisionSelected(): void {
    this.refreshTeams();
  }
}
