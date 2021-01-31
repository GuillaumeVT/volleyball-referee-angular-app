import { LoginGuard } from 'src/app/core/guards/login.guard';
import { PublicGuard } from 'src/app/core/guards/public.guard';
import { GameComponent } from 'src/app/modules/game/components/game/game.component';
import { LeagueComponent } from 'src/app/modules/league/components/league/league.component';
import { SearchResultDateComponent } from 'src/app/modules/search/components/search-result-date/search-result-date.component';
import { SearchResultLiveComponent } from 'src/app/modules/search/components/search-result-live/search-result-live.component';
import { SearchResultTokenComponent } from 'src/app/modules/search/components/search-result-token/search-result-token.component';
import { SearchComponent } from 'src/app/modules/search/components/search/search.component';
import { UserColleaguesComponent } from 'src/app/modules/user-data/components/user-colleagues/user-colleagues.component';
import { UserGamesComponent } from 'src/app/modules/user-data/components/user-games/user-games.component';
import { UserLeaguesComponent } from 'src/app/modules/user-data/components/user-leagues/user-leagues.component';
import { UserRulesComponent } from 'src/app/modules/user-data/components/user-rules/user-rules.component';
import { UserTeamsComponent } from 'src/app/modules/user-data/components/user-teams/user-teams.component';
import { AccountComponent } from 'src/app/modules/user-management/components/account/account.component';
import { HomeComponent } from 'src/app/modules/user-management/components/home/home.component';
import { PasswordLostComponent } from 'src/app/modules/user-management/components/password-lost/password-lost.component';
import { PasswordResetComponent } from 'src/app/modules/user-management/components/password-reset/password-reset.component';
import { SignInComponent } from 'src/app/modules/user-management/components/sign-in/sign-in.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from 'src/app/shared/components/privacy-policy/privacy-policy.component';

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
