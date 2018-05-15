import { GameService } from '../game.service';
import { GameFilter } from '../utils/gamefilter';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../model/team';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnChanges {

  @Input() token:      string;
  @Input() date:       string;
  @Input() leagueDate: number;
  @Input() team:       Team;
  @Input() live:       boolean;

  gameFilter: GameFilter;

  constructor(private route: ActivatedRoute, private gameService: GameService) {
    this.gameFilter = new GameFilter();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.token && this.token.length) {
      this.gameService.searchGames(this.token).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    } else if (this.date && this.date.length) {
      this.gameService.searchGamesByDate(this.date).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    } else if (this.leagueDate && this.team) {
      if (this.team.name === 'All teams') {
        this.gameService.searchGamesInLeague(this.leagueDate).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
      } else {
        this.gameService.searchGamesOfTeamInLeague(this.leagueDate, this.team.name, this.team.gender).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
      }
    } else if (this.live) {
      this.gameService.searchLiveGames().subscribe(liveGames => this.gameFilter.updateGames(liveGames), error => this.gameFilter.updateGames([]));
    }
  }

}
