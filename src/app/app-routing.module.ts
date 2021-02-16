import { LoginGuard } from 'src/app/core/guards/login.guard';
import { PublicGuard } from 'src/app/core/guards/public.guard';
import { PageNotFoundComponent } from 'src/app/core/pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from 'src/app/core/pages/privacy-policy/privacy-policy.component';
import { GameComponent } from 'src/app/modules/game/pages/game/game.component';
import { LeagueComponent } from 'src/app/modules/league/pages/league/league.component';
import { SearchResultDateComponent } from 'src/app/modules/search/pages/search-result-date/search-result-date.component';
import { SearchResultLiveComponent } from 'src/app/modules/search/pages/search-result-live/search-result-live.component';
import { SearchResultTokenComponent } from 'src/app/modules/search/pages/search-result-token/search-result-token.component';
import { SearchComponent } from 'src/app/modules/search/pages/search/search.component';
import { UserColleaguesComponent } from 'src/app/modules/user-data/pages/user-colleagues/user-colleagues.component';
import { UserGamesComponent } from 'src/app/modules/user-data/pages/user-games/user-games.component';
import { UserLeaguesComponent } from 'src/app/modules/user-data/pages/user-leagues/user-leagues.component';
import { UserRulesComponent } from 'src/app/modules/user-data/pages/user-rules/user-rules.component';
import { UserTeamsComponent } from 'src/app/modules/user-data/pages/user-teams/user-teams.component';
import { AccountComponent } from 'src/app/modules/user-management/pages/account/account.component';
import { HomeComponent } from 'src/app/modules/user-management/pages/home/home.component';
import { PasswordLostComponent } from 'src/app/modules/user-management/pages/password-lost/password-lost.component';
import { PasswordResetComponent } from 'src/app/modules/user-management/pages/password-reset/password-reset.component';
import { SignInComponent } from 'src/app/modules/user-management/pages/sign-in/sign-in.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
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
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
