import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Game } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameId: string;
  game: Game;
  currentSet: number;
  leftTeam: TeamType;
  rightTeam: TeamType;
  rate: number;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private translate: TranslateService,
  ) {
    this.translate.get('game.page').subscribe((t) => this.titleService.setTitle(t));
    this.currentSet = 0;
    this.leftTeam = TeamType.Home;
    this.rightTeam = TeamType.Guest;
    this.rate = 60000;
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.userService.authState.subscribe((userToken) => {
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
