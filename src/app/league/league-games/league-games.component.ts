import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';
import { League } from '../../model/league';
import { TeamSummary } from '../../model/team';
import { PublicService } from '../../services/public.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-league-games',
  templateUrl: './league-games.component.html',
  styleUrls: ['./league-games.component.css']
})
export class LeagueGamesComponent implements OnInit, OnDestroy, OnChanges {

  selectedDivision: string;
  allDivisions:     string;
  selectedTeam:     TeamSummary;
  allTeams:         TeamSummary;
  teams:            TeamSummary[];

  subscription:     Subscription;
  autoRefresh:      boolean;

  @Input() league: League;

  constructor(private publicService: PublicService, private utils: Utils) {
    this.allDivisions = "All pools / divisions";
    this.selectedDivision = this.allDivisions;
    this.allTeams = new TeamSummary();
    this.allTeams.id = 'All teams';
    this.allTeams.name = this.allTeams.id;
    this.teams = [];
    this.selectedTeam = this.allTeams;
    this.autoRefresh = true;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
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
      this.publicService.listTeamsOfLeague(this.league.id).subscribe(teams => this.teams = teams, error => this.teams = []);
    } else {
      this.publicService.listTeamsOfDivision(this.league.id, this.selectedDivision).subscribe(teams => this.teams = teams, error => this.teams = []);
    }
  }

  onDivisionSelected(): void {
    this.refreshTeams();
  }

}
