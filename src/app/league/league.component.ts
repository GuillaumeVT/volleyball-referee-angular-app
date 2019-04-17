import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';
import { League } from '../model/league';
import { GameDescription } from '../model/game-description';
import { TeamDescription } from '../model/team-description';
import { PublicService } from '../services/public.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit, OnDestroy {

  leagueId:      string;
  league:        League;
  selectedIndex: number;
  liveGames:     GameDescription[];
  next10Games:   GameDescription[];
  last10Games:   GameDescription[];
  selectedTeam:  TeamDescription;
  allTeams:      TeamDescription;
  teams:         TeamDescription[];
  autoRefresh:   boolean;

  constructor(private titleService: Title, private route: ActivatedRoute, private router: Router, private publicService: PublicService, private utils: Utils) {
    this.titleService.setTitle('VBR - View League');
    this.selectedIndex = 0;
    this.liveGames = [];
    this.next10Games = [];
    this.last10Games = [];
    this.allTeams = new TeamDescription();
    this.allTeams.id = 'All teams';
    this.allTeams.name = this.allTeams.id;
    this.teams = [];
    this.selectedTeam = this.allTeams;
    this.autoRefresh = true;
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('leagueId');

    if (this.leagueId) {
      this.publicService.getLeague(this.leagueId).subscribe(league => this.onLeagueUpdated(league));
    }
  }

  ngOnDestroy(){
    this.autoRefresh = false;
  }

  onLeagueUpdated(league: League): void  {
    this.league = league;
    this.refreshTeams();
    timer(0, 120000).pipe(takeWhile(() => this.autoRefresh)).subscribe(() => this.refreshGames());
  }

  refreshGames(): void {
    this.publicService.listLiveGamesInLeague(this.leagueId).subscribe(games => this.liveGames = games, error => this.liveGames = []);
    this.publicService.listNext10GamesInLeague(this.leagueId).subscribe(games => this.next10Games = games, error => this.next10Games = []);
    this.publicService.listLast10GamesInLeague(this.leagueId).subscribe(games => this.last10Games = games, error => this.last10Games = []);
  }

  refreshTeams(): void {
    this.publicService.listTeamsOfLeague(this.leagueId).subscribe(teams => this.teams = teams, error => this.teams = []);
  }

  getLinkClass(index: number): string {
    if (this.selectedIndex === index) {
      return 'btn vbr-button-selected';
    } else {
      return 'btn vbr-button-unselected';
    }
  }

  showDashboard(): void  {
    this.selectedIndex = 0;
  }

  showGames(): void  {
    this.selectedIndex = 1;
  }

}
