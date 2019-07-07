import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserSummary, FriendRequest } from '../../model/user';
import { UserService } from '../../services/user.service';
import { GameService } from '../../services/game.service';
import { GameSummary } from '../../model/game';
import { forkJoin, Subscription } from 'rxjs';

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
        forkJoin(
          this.userService.listFriendRequestsReceivedBy(),
          this.gameService.listAvailableGames()
        )
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
