import { PublicService } from '../public.service';
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

  @Input() token:    string;
  @Input() date:     string;
  @Input() leagueId: string;
  @Input() teamId:   string;
  @Input() live:     boolean;

  gameFilter: GameFilter;

  constructor(private route: ActivatedRoute, private publicService: PublicService) {
    this.gameFilter = new GameFilter();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.token && this.token.length) {
      this.publicService.listGamesMatchingToken(this.token).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    } else if (this.date && this.date.length) {
      this.publicService.listGamesWithScheduleDate(this.date).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    } else if (this.leagueId && this.teamId) {
      if (this.teamId === "All teams") {
        this.publicService.listGamesInLeague(this.leagueId).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
      } else {
        this.publicService.listGamesOfTeamInLeague(this.leagueId, this.teamId).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
      }
    } else if (this.live) {
      this.publicService.listLiveGames().subscribe(liveGames => this.gameFilter.updateGames(liveGames), error => this.gameFilter.updateGames([]));
    }
  }

}
