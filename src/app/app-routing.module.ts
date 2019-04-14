import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchResultTokenComponent } from './search-result-token/search-result-token.component';
import { SearchResultLiveComponent } from './search-result-live/search-result-live.component';
import { SearchResultDateComponent } from './search-result-date/search-result-date.component';
import { UserRulesComponent } from './user-rules/user-rules.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';
import { UserColleaguesComponent } from './user-colleagues/user-colleagues.component';
import { LeagueComponent } from './league/league.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search/live', component: SearchResultLiveComponent },
  { path: 'search/token/:token', component: SearchResultTokenComponent },
  { path: 'search/date/:date', component: SearchResultDateComponent },
  { path: 'view/game/:gameId', component: GameComponent },
  { path: 'view/league/:leagueId', component: LeagueComponent },
  { path: 'colleagues', component: UserColleaguesComponent },
  { path: 'leagues', component: UserLeaguesComponent },
  { path: 'rules', component: UserRulesComponent },
  { path: 'teams', component: UserTeamsComponent },
  { path: 'games', component: UserGamesComponent },
  { path: 'games/league/:leagueId', component: UserGamesComponent },
  { path: 'private-policy', component: PrivatePolicyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
