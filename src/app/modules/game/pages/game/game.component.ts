import { UserService } from 'src/app/core/services/user.service';
import { Game } from 'src/app/shared/models/game.model';
import { TeamType } from 'src/app/shared/models/team-type.model';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameId:     string;
  game:       Game;
  currentSet: number;
  leftTeam:   TeamType;
  rightTeam:  TeamType;
  rate:       number;

  constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService) {
    this.titleService.setTitle('VBR - View Match');
    this.currentSet = 0;
    this.leftTeam = TeamType.Home;
    this.rightTeam = TeamType.Guest
    this.rate = 60000;
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.userService.authState.subscribe(userToken => {
      if (userToken) {
        this.rate = 10000;
      } else {
        this.rate = 60000;
      }
    });
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
