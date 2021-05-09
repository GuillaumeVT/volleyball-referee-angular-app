import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { League } from 'src/app/shared/models/league.model';
import { TeamSummary } from 'src/app/shared/models/team.model';
import { PublicService } from 'src/app/shared/services/public.service';

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { idAll } from 'src/app/shared/models/variable.model';

@Component({
  selector: 'app-league-games',
  templateUrl: './league-games.component.html',
  styleUrls: ['./league-games.component.scss']
})
export class LeagueGamesComponent implements OnDestroy, OnChanges {

  selectedDivision: string;
  allDivisions:     string;
  selectedTeam:     TeamSummary;
  allTeams:         TeamSummary;
  teams:            TeamSummary[];

  subscription:     Subscription;
  autoRefresh:      boolean;

  @Input() league: League;

  constructor(private publicService: PublicService) {
    this.allDivisions = idAll;
    this.selectedDivision = this.allDivisions;
    this.allTeams = new TeamSummary();
    this.allTeams.id = idAll;
    this.allTeams.name = this.allTeams.id;
    this.teams = [];
    this.selectedTeam = this.allTeams;
    this.autoRefresh = true;
  }

  ngOnChanges(_changes: SimpleChanges) {
    if (this.league) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, 120000).pipe(takeWhile(() => this.autoRefresh)).subscribe(() => this.refreshTeams());
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
      this.publicService.listTeamsOfLeague(this.league.id).subscribe(teams => this.teams = teams, _error => this.teams = []);
    } else {
      this.publicService.listTeamsOfDivision(this.league.id, this.selectedDivision).subscribe(teams => this.teams = teams, _error => this.teams = []);
    }
  }

  onDivisionSelected(): void {
    this.refreshTeams();
  }

}
