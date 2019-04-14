import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { GoogleLoginProvider } from '../login/providers/google-login-provider';
import { FacebookLoginProvider } from '../login/providers/facebook-login-provider';
import { User } from '../model/user';
import { FriendRequest } from '../model/friend-request';
import { GameDescription } from '../model/game-description';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signedIn:                 boolean;
  user:                     User;
  friendRequestsReceivedBy: FriendRequest[];
  availableGames:           GameDescription[];

  constructor(private titleService: Title, private authService: AuthService, private userService: UserService, private gameService: GameService) {
    this.titleService.setTitle('Volleyball Referee');
    this.signedIn = false;
    this.friendRequestsReceivedBy = [];
    this.availableGames = [];
  }

  ngOnInit() {
    this.authService.authState.subscribe(socialUser => {
      this.signedIn = (socialUser != null);

      if (this.signedIn) {
        this.refreshUser();
      }
    });
  }

  refreshUser(): void {
    setTimeout(() => this.userService.getUser().subscribe(user => this.onUserRefreshed(user), error => this.onUserRefreshed(null)), 0);
  }

  onUserRefreshed(user: User): void {
    this.user = user;
    if (this.user) {
      forkJoin(
        this.userService.listFriendRequestsReceivedBy(),
        this.gameService.listAvailableGames()
      )
      .subscribe(([friendRequests, games]) => {
        this.friendRequestsReceivedBy = friendRequests;
        this.availableGames = games;
      });
    }
  }

  refreshFriendRequestsReceivedBy(): void {
    this.userService.listFriendRequestsReceivedBy().subscribe(friendRequests => this.friendRequestsReceivedBy = friendRequests, error => this.friendRequestsReceivedBy = []);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
