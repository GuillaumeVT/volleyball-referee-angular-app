import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { GoogleLoginProvider } from '../login/providers/google-login-provider';
import { FacebookLoginProvider } from '../login/providers/facebook-login-provider';
import { SocialUser } from '../login/entities/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:            SocialUser;
  signedIn:        boolean;
  showGreetings1:  boolean;
  showGreetings2:  boolean;
  numberOfRules:   number;
  numberOfTeams:   number;
  numberOfGames:   number;
  numberOfLeagues: number;

  constructor(private titleService: Title, private authService: AuthService, private userService: UserService) {
    this.titleService.setTitle('Volleyball Referee - User');
    this.signedIn = false;
    this.showGreetings1 = true;
    this.showGreetings2 = true;
    this.numberOfRules = 0;
    this.numberOfTeams = 0;
    this.numberOfGames = 0;
    this.numberOfLeagues = 0;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signedIn = (user != null);

      if (this.signedIn) {
        this.userService.getNumberOfRules().subscribe(count => this.numberOfRules = count, error => this.numberOfRules = 0);
        this.userService.getNumberOfTeams().subscribe(count => this.numberOfTeams = count, error => this.numberOfTeams = 0);
        this.userService.getNumberOfGames().subscribe(count => this.numberOfGames = count, error => this.numberOfGames = 0);
        this.userService.getNumberOfLeagues().subscribe(count => this.numberOfLeagues = count, error => this.numberOfLeagues = 0);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUserRulesUrl(): string {
    return '/user/rules';
  }

  getUserTeamsUrl(): string {
    return '/user/teams';
  }

  getUserGamesUrl(): string {
    return '/user/games';
  }

  getUserLeaguesUrl(): string {
    return '/user/leagues';
  }

  hideGreetings1(): void {
    this.showGreetings1 = false;
  }

  hideGreetings2(): void {
    this.showGreetings2 = false;
  }

}
