import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { GameSummary } from 'src/app/shared/models/game.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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
