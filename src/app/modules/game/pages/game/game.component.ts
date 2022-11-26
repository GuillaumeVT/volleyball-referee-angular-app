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
  public gameId: string;
  public game: Game;
  public currentSet: number;
  public leftTeam: TeamType;
  public rightTeam: TeamType;
  public rate: number;

  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _translateService: TranslateService,
  ) {
    this._translateService.get('game.page').subscribe((t) => this._titleService.setTitle(t));
    this.currentSet = 0;
    this.leftTeam = TeamType.Home;
    this.rightTeam = TeamType.Guest;
    this.rate = 60000;
  }

  public ngOnInit(): void {
    this.gameId = this._activatedRoute.snapshot.paramMap.get('gameId');
    this._userService.authState.subscribe((userToken) => {
      if (userToken) {
        this.rate = 10000;
      } else {
        this.rate = 60000;
      }
    });
  }

  public onCurrentGameUpdated(game: Game): void {
    this.game = game;
  }

  public onCurrentSetUpdated(setIndex: number): void {
    this.currentSet = setIndex;
  }

  public onTeamsSwapped(): void {
    if (TeamType.Home === this.leftTeam) {
      this.leftTeam = TeamType.Guest;
      this.rightTeam = TeamType.Home;
    } else {
      this.leftTeam = TeamType.Home;
      this.rightTeam = TeamType.Guest;
    }
  }
}
