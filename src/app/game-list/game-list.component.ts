import { GameService } from '../game.service';
import { GameFilter } from '../utils/gamefilter';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @Input() token: string;
  @Input() date:  string;

  gameFilter: GameFilter;

  constructor(private route: ActivatedRoute, private gameService: GameService) {
    this.gameFilter = new GameFilter();
  }

  ngOnInit() {
    if (this.token && this.token.length) {
      this.route.params.subscribe(params => {
        this.token = params['token'];
        this.gameService.searchGames(this.token).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
      });
    } else if (this.date && this.date.length) {
      this.route.params.subscribe(params => {
        this.date = params['date'];
        this.gameService.searchGamesByDate(this.date).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
      });
    } else {
      this.gameService.searchLiveGames().subscribe(liveGames => this.gameFilter.updateGames(liveGames), error => this.gameFilter.updateGames([]));
    }
  }

}
