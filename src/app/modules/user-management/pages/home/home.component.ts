import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { GameSummary } from 'src/app/shared/models/game.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  availableGames: GameSummary[];

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private gameService: GameService) {
    this.titleService.setTitle('Volleyball Referee');
    this.availableGames = [];
  }

  ngOnInit() {
    this.subscription.add(this.userService.authState.subscribe(userToken => {
      if (userToken) {
        this.gameService.listAvailableGames().subscribe(games => this.availableGames = games, _error => this.availableGames = []);
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
