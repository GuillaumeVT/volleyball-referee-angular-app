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
  availableGames: GameSummary[];

  private subscription: Subscription = new Subscription();

  constructor(
    private titleService: Title,
    private userService: UserService,
    private gameService: GameService,
    private translate: TranslateService,
  ) {
    this.translate.get('app').subscribe((t) => this.titleService.setTitle(t));
    this.availableGames = [];
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.authState.subscribe((userToken) => {
        if (userToken) {
          this.gameService.listAvailableGames().subscribe(
            (games) => (this.availableGames = games),
            (_error) => (this.availableGames = []),
          );
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
