import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameStatistics } from '../model/gamestatistics';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit {

  gameStatistics: GameStatistics;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGameStatistics().subscribe(gameStatistics => this.gameStatistics = gameStatistics);
  }

}
