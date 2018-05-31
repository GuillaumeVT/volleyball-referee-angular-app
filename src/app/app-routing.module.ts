import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultLiveComponent } from './search-result-live/search-result-live.component';
import { SearchResultDateComponent } from './search-result-date/search-result-date.component';
import { UserComponent } from './user/user.component';
import { UserRulesComponent } from './user-rules/user-rules.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';
import { LeagueComponent } from './league/league.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'search/live', component: SearchResultLiveComponent },
  { path: 'search/:token', component: SearchResultComponent },
  { path: 'search/date/:date', component: SearchResultDateComponent },
  { path: 'game/:date', component: GameComponent },
  { path: 'indoor/:date', component: GameComponent },
  { path: 'beach/:date', component: GameComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/rules', component: UserRulesComponent },
  { path: 'user/teams', component: UserTeamsComponent },
  { path: 'user/games', component: UserGamesComponent },
  { path: 'user/leagues', component: UserLeaguesComponent },
  { path: 'user/leagues/:league/:kind', component: UserGamesComponent },
  { path: 'league/:date', component: LeagueComponent },
  { path: 'private-policy', component: PrivatePolicyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
