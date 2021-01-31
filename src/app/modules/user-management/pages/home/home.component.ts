import { forkJoin, Subscription } from 'rxjs';
import { FriendRequest } from 'src/app/core/models/user.model';
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

  friendRequestsReceivedBy: FriendRequest[];
  availableGames:           GameSummary[];

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private gameService: GameService) {
    this.titleService.setTitle('Volleyball Referee');
    this.friendRequestsReceivedBy = [];
    this.availableGames = [];
  }

  ngOnInit() {
    this.subscription.add(this.userService.authState.subscribe(userToken => {
      if (userToken) {
        forkJoin([
          this.userService.listFriendRequestsReceivedBy(),
          this.gameService.listAvailableGames()
        ])
        .subscribe(([friendRequests, games]) => {
          this.friendRequestsReceivedBy = friendRequests;
          this.availableGames = games;
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshFriendRequestsReceivedBy(): void {
    this.userService.listFriendRequestsReceivedBy().subscribe(friendRequests => this.friendRequestsReceivedBy = friendRequests, error => this.friendRequestsReceivedBy = []);
  }

  getPageNumber(): number {
    return 0;
  }
}
