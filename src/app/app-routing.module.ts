import { HomeComponent } from './user/home/home.component';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchResultTokenComponent } from './search/search-result-token/search-result-token.component';
import { SearchResultLiveComponent } from './search/search-result-live/search-result-live.component';
import { SearchResultDateComponent } from './search/search-result-date/search-result-date.component';
import { UserRulesComponent } from './user-rules/user-rules.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';
import { UserColleaguesComponent } from './user-colleagues/user-colleagues.component';
import { LeagueComponent } from './league/league.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { PasswordLostComponent } from './user/password-lost/password-lost.component';
import { AccountComponent } from './user/account/account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './guards/public.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [ PublicGuard ] },
  { path: 'password-lost', component: PasswordLostComponent, canActivate: [ PublicGuard ] },
  { path: 'password-reset', component: PasswordResetComponent, canActivate: [ PublicGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ LoginGuard ] },
  { path: 'account', component: AccountComponent, canActivate: [ LoginGuard ] },
  { path: 'search', component: SearchComponent },
  { path: 'search/live', component: SearchResultLiveComponent },
  { path: 'search/token/:token', component: SearchResultTokenComponent },
  { path: 'search/date/:date', component: SearchResultDateComponent },
  { path: 'view/game/:gameId', component: GameComponent },
  { path: 'view/league/:leagueId', component: LeagueComponent },
  { path: 'colleagues', component: UserColleaguesComponent, canActivate: [ LoginGuard ] },
  { path: 'leagues', component: UserLeaguesComponent, canActivate: [ LoginGuard ] },
  { path: 'rules', component: UserRulesComponent, canActivate: [ LoginGuard ] },
  { path: 'teams', component: UserTeamsComponent, canActivate: [ LoginGuard ] },
  { path: 'games', component: UserGamesComponent, canActivate: [ LoginGuard ] },
  { path: 'games/league/:leagueId', component: UserGamesComponent, canActivate: [ LoginGuard ] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
