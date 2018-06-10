import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import "rxjs/add/operator/takeWhile";
import { League } from '../model/league';
import { GameDescription } from '../model/gamedescription';
import { Team } from '../model/team';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit, OnDestroy {

  date:          number;
  league:        League;
  selectedIndex: number;
  liveGames:     GameDescription[];
  next10Games:   GameDescription[];
  last10Games:   GameDescription[];
  selectedTeam:  Team;
  allTeams:      Team;
  teams:         Team[];
  autoRefresh:   boolean;

  constructor(private titleService: Title, private route: ActivatedRoute, private router: Router, private gameService: GameService, private userService: UserService, private utils: Utils) {
    this.titleService.setTitle('Volleyball Referee - League');
    this.selectedIndex = 0;
    this.liveGames = [];
    this.next10Games = [];
    this.last10Games = [];
    this.allTeams = new Team();
    this.allTeams.name = 'All teams';
    this.teams = [];
    this.selectedTeam = this.allTeams;
    this.autoRefresh = true;
  }

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('date');

    if (idStr) {
      this.date = Number(idStr);
      this.userService.getLeaguePublic(this.date).subscribe(league => this.onLeagueUpdated(league));
    }
  }

  ngOnDestroy(){
    this.autoRefresh = false;
  }

  onLeagueUpdated(league: League): void  {
    this.league = league;
    this.refreshTeams();
    TimerObservable.create(0, 120000).takeWhile(() => this.autoRefresh).subscribe(() => this.refreshGames());
  }

  refreshGames(): void {
    this.gameService.searchLiveGamesInLeague(this.league.date).subscribe(games => this.liveGames = games, error => this.liveGames = []);
    this.gameService.searchNext10GamesInLeague(this.league.date).subscribe(games => this.next10Games = games, error => this.next10Games = []);
    this.gameService.searchLast10GamesInLeague(this.league.date).subscribe(games => this.last10Games = games, error => this.last10Games = []);
  }

  refreshTeams(): void {
    this.userService.getTeamsInLeaguePublic(this.league.date).subscribe(teams => this.teams = this.utils.sortTeams(teams), error => this.teams = []);
  }

  getLinkClass(index: number): string {
    if (this.selectedIndex === index) {
      return 'btn vbr-button';
    } else {
      return 'btn vbr-button-inverted';
    }
  }

  showDashboard(): void  {
    this.selectedIndex = 0;
  }

  showGames(): void  {
    this.selectedIndex = 1;
  }

}
