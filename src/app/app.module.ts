import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { Utils } from './utils/utils';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultLiveComponent } from './search-result-live/search-result-live.component';
import { SearchResultDateComponent } from './search-result-date/search-result-date.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameListItemComponent } from './game-list-item/game-list-item.component';
import { BeachGameComponent } from './beach-game/beach-game.component';
import { IndoorGameComponent } from './indoor-game/indoor-game.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { SetSummaryComponent } from './set-summary/set-summary.component';
import { SetSelectorComponent } from './set-selector/set-selector.component';
import { BeachCourtComponent } from './beach-court/beach-court.component';
import { IndoorCourtComponent } from './indoor-court/indoor-court.component';
import { LadderComponent } from './ladder/ladder.component';
import { GameRefreshComponent } from './game-refresh/game-refresh.component';
import { LinksBarComponent } from './links-bar/links-bar.component';
import { GameStatisticsComponent } from './game-statistics/game-statistics.component';
import { Indoor4x4GameComponent } from './indoor4x4-game/indoor4x4-game.component';
import { Indoor4x4CourtComponent } from './indoor4x4-court/indoor4x4-court.component';
import { SetSubstitutionsComponent } from './set-substitutions/set-substitutions.component';
import { SetTimeoutsComponent } from './set-timeouts/set-timeouts.component';
import { GamePlayersComponent } from './game-players/game-players.component';
import { GameSanctionsComponent } from './game-sanctions/game-sanctions.component';
import { SetLineupsComponent } from './set-lineups/set-lineups.component';
import { TimeGameComponent } from './time-game/time-game.component';
import { TimeGameSummaryComponent } from './time-game-summary/time-game-summary.component';
import { UserComponent } from './user/user.component';
import { GameComponent } from './game/game.component';
import { UserRulesComponent } from './user-rules/user-rules.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { UserRulesModalComponent } from './user-rules-modal/user-rules-modal.component';
import { OkCancelModalComponent } from './ok-cancel-modal/ok-cancel-modal.component';
import { UserTeamModalComponent } from './user-team-modal/user-team-modal.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { UserGameModalComponent } from './user-game-modal/user-game-modal.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';
import { UserLeaguesModalComponent } from './user-leagues-modal/user-leagues-modal.component';
import { LeagueComponent } from './league/league.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';

import { AuthService, AuthServiceConfig } from './auth.service';
import { GoogleLoginProvider } from './login/providers/google-login-provider';
import { FacebookLoginProvider } from './login/providers/facebook-login-provider';

export function configFactory(config: AuthServiceConfig) {
  return config;
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider("802590775795-kdff0cnflla62jr2dj0pleqbiv05q97l.apps.googleusercontent.com") },
    { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider("2086514551632301") }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SearchResultLiveComponent,
    SearchResultDateComponent,
    SearchComponent,
    PageNotFoundComponent,
    NavigationBarComponent,
    GameListComponent,
    GameListItemComponent,
    BeachGameComponent,
    IndoorGameComponent,
    GameSummaryComponent,
    SetSummaryComponent,
    SetSelectorComponent,
    BeachCourtComponent,
    IndoorCourtComponent,
    LadderComponent,
    GameRefreshComponent,
    LinksBarComponent,
    GameStatisticsComponent,
    Indoor4x4GameComponent,
    Indoor4x4CourtComponent,
    SetSubstitutionsComponent,
    SetTimeoutsComponent,
    GamePlayersComponent,
    GameSanctionsComponent,
    SetLineupsComponent,
    TimeGameComponent,
    TimeGameSummaryComponent,
    UserComponent,
    GameComponent,
    UserRulesComponent,
    UserTeamsComponent,
    UserRulesModalComponent,
    UserTeamModalComponent,
    OkCancelModalComponent,
    UserGamesComponent,
    UserGameModalComponent,
    UserNavComponent,
    UserLeaguesComponent,
    UserLeaguesModalComponent,
    LeagueComponent,
    PrivatePolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    GameService,
    UserService,
    AuthService,
    Utils,
    DatePipe,
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
  ],
  entryComponents: [
    UserRulesModalComponent,
    UserTeamModalComponent,
    UserGameModalComponent,
    UserLeaguesModalComponent,
    OkCancelModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
