import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  date:       number;
  game:       Game;
  currentSet: number;
  leftTeam:   TeamType;
  rightTeam:  TeamType;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle('Volleyball Referee - Match');
    this.currentSet = 0;
    this.leftTeam = TeamType.Home;
    this.rightTeam = TeamType.Guest;
  }

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('date');
    this.date = Number(idStr);
  }

  onCurrentGameUpdated(game: Game): void {
    this.game = game;
  }

  onCurrentSetUpdated(setIndex: number): void {
    this.currentSet = setIndex;
  }

  onTeamsSwapped(): void {
    if (TeamType.Home === this.leftTeam) {
      this.leftTeam = TeamType.Guest;
      this.rightTeam = TeamType.Home;
    } else {
      this.leftTeam = TeamType.Home;
      this.rightTeam = TeamType.Guest;
    }
  }

}
