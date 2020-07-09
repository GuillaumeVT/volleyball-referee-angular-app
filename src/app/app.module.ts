import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { Utils } from './utils/utils';
import { SearchComponent } from './search/search.component';
import { SearchResultTokenComponent } from './search/search-result-token/search-result-token.component';
import { SearchResultLiveComponent } from './search/search-result-live/search-result-live.component';
import { SearchResultDateComponent } from './search/search-result-date/search-result-date.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameListComponent } from './search/game-list/game-list.component';
import { GameListItemComponent } from './search/game-list-item/game-list-item.component';
import { BeachGameComponent } from './game/beach-game/beach-game.component';
import { IndoorGameComponent } from './game/indoor-game/indoor-game.component';
import { GameSummaryComponent } from './game/game-summary/game-summary.component';
import { SetSummaryComponent } from './set/set-summary/set-summary.component';
import { SetSelectorComponent } from './set/set-selector/set-selector.component';
import { BeachCourtComponent } from './court/beach-court/beach-court.component';
import { IndoorCourtComponent } from './court/indoor-court/indoor-court.component';
import { Indoor4x4CourtComponent } from './court/indoor4x4-court/indoor4x4-court.component';
import { LadderComponent } from './set/ladder/ladder.component';
import { GameRefreshComponent } from './game/game-refresh/game-refresh.component';
import { LinksBarComponent } from './links-bar/links-bar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { Indoor4x4GameComponent } from './game/indoor4x4-game/indoor4x4-game.component';
import { SetSubstitutionsComponent } from './set/set-substitutions/set-substitutions.component';
import { SetTimeoutsComponent } from './set/set-timeouts/set-timeouts.component';
import { GamePlayersComponent } from './game/game-players/game-players.component';
import { GameSanctionsComponent } from './game/game-sanctions/game-sanctions.component';
import { GameComponent } from './game/game.component';
import { UserRulesComponent } from './user-rules/user-rules.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { UserRulesModalComponent } from './user-rules/user-rules-modal/user-rules-modal.component';
import { OkCancelModalComponent } from './ok-cancel-modal/ok-cancel-modal.component';
import { UserTeamModalComponent } from './user-teams/user-team-modal/user-team-modal.component';
import { PlayerNamesModalComponent } from './user-teams/player-names-modal/player-names-modal.component';
import { ColorPickerModalComponent } from './user-teams/color-picker-modal/color-picker-modal.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { UserGameModalComponent } from './user-games/user-game-modal/user-game-modal.component';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';
import { UserLeagueModalComponent } from './user-leagues/user-league-modal/user-league-modal.component';
import { LeagueComponent } from './league/league.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeComponent } from './user/home/home.component';
import { UserColleaguesComponent } from './user-colleagues/user-colleagues.component';
import { UserColleagueModalComponent } from './user-colleagues/user-colleague-modal/user-colleague-modal.component';
import { ColleagueRequestItemComponent } from './user-colleagues/colleague-request-item/colleague-request-item.component';
import { DivisionRankingsComponent } from './league/division-rankings/division-rankings.component';
import { LeagueDashboardComponent } from './league/league-dashboard/league-dashboard.component';
import { LeagueGamesComponent } from './league/league-games/league-games.component';
import { GameRefereeModalComponent } from './user-games/game-referee-modal/game-referee-modal.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { PasswordLostComponent } from './user/password-lost/password-lost.component';
import { AccountComponent } from './user/account/account.component';
import { SnowGameComponent } from './game/snow-game/snow-game.component';
import { SnowCourtComponent } from './court/snow-court/snow-court.component';
import { IndoorSetLineupsComponent } from './set/indoor-set-lineups/indoor-set-lineups.component';
import { Indoor4x4SetLineupsComponent } from './set/indoor4x4-set-lineups/indoor4x4-set-lineups.component';
import { SnowSetLineupsComponent } from './set/snow-set-lineups/snow-set-lineups.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultTokenComponent,
    SearchResultLiveComponent,
    SearchResultDateComponent,
    PageNotFoundComponent,
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
    StatisticsComponent,
    Indoor4x4GameComponent,
    Indoor4x4CourtComponent,
    SetSubstitutionsComponent,
    SetTimeoutsComponent,
    GamePlayersComponent,
    GameSanctionsComponent,
    GameComponent,
    UserRulesComponent,
    UserTeamsComponent,
    UserRulesModalComponent,
    UserTeamModalComponent,
    PlayerNamesModalComponent,
    OkCancelModalComponent,
    UserGamesComponent,
    UserGameModalComponent,
    UserLeaguesComponent,
    UserLeagueModalComponent,
    LeagueComponent,
    PrivacyPolicyComponent,
    ColorPickerModalComponent,
    HomeComponent,
    UserColleaguesComponent,
    UserColleagueModalComponent,
    ColleagueRequestItemComponent,
    DivisionRankingsComponent,
    LeagueDashboardComponent,
    LeagueGamesComponent,
    GameRefereeModalComponent,
    SignInComponent,
    PasswordResetComponent,
    PasswordLostComponent,
    AccountComponent,
    SnowGameComponent,
    SnowCourtComponent,
    IndoorSetLineupsComponent,
    Indoor4x4SetLineupsComponent,
    SnowSetLineupsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxChartsModule
  ],
  providers: [
    Utils,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' }
  ],
  entryComponents: [
    UserRulesModalComponent,
    UserTeamModalComponent,
    PlayerNamesModalComponent,
    UserGameModalComponent,
    UserLeagueModalComponent,
    OkCancelModalComponent,
    ColorPickerModalComponent,
    UserColleagueModalComponent,
    GameRefereeModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
