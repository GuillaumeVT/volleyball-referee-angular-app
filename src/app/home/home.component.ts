import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { GameService } from '../services/game.service';
import { GoogleLoginProvider } from '../services/login/providers/google-login-provider';
import { FacebookLoginProvider } from '../services/login/providers/facebook-login-provider';
import { FriendRequest } from '../model/friend-request';
import { GameDescription } from '../model/game-description';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  signedIn:                 boolean;
  user:                     User;
  friendRequestsReceivedBy: FriendRequest[];
  availableGames:           GameDescription[];

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private authService: AuthService, private userService: UserService, private gameService: GameService) {
    this.titleService.setTitle('Volleyball Referee');
    this.signedIn = false;
    this.friendRequestsReceivedBy = [];
    this.availableGames = [];
  }

  ngOnInit() {
    this.subscription.add(this.userService.userState.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.signedIn = this.userService.isSignedIn();
        forkJoin(
          this.userService.listFriendRequestsReceivedBy(),
          this.gameService.listAvailableGames()
        )
        .subscribe(([friendRequests, games]) => {
          this.friendRequestsReceivedBy = friendRequests;
          this.availableGames = games;
        });
      } else {
        this.signedIn = false;
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
