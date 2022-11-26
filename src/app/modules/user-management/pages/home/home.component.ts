import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { GameSummary } from '@shared/models/game.model';
import { GameService } from '@user-data/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public availableGames: GameSummary[];

  private _subscription: Subscription;

  constructor(
    private _titleService: Title,
    private _userService: UserService,
    private _gameService: GameService,
    private _translateService: TranslateService,
  ) {
    this._translateService.get('app').subscribe((t) => this._titleService.setTitle(t));
    this.availableGames = [];
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this._subscription.add(
      this._userService.authState.subscribe((userToken) => {
        if (userToken) {
          this._gameService.listAvailableGames().subscribe({
            next: (games) => (this.availableGames = games),
            error: (_) => (this.availableGames = []),
          });
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
