import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AuthService, AuthServiceConfig } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { GoogleLoginProvider } from './login/providers/google-login-provider';
import { FacebookLoginProvider } from './login/providers/facebook-login-provider';

import { AppComponent } from './app.component';
import { Utils } from './utils/utils';
import { SearchResultTokenComponent } from './search-result-token/search-result-token.component';
import { SearchResultLiveComponent } from './search-result-live/search-result-live.component';
import { SearchResultDateComponent } from './search-result-date/search-result-date.component';
import { AppRoutingModule } from './app-routing.module';
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
import { StatisticsComponent } from './statistics/statistics.component';
import { Indoor4x4GameComponent } from './indoor4x4-game/indoor4x4-game.component';
import { Indoor4x4CourtComponent } from './indoor4x4-court/indoor4x4-court.component';
import { SetSubstitutionsComponent } from './set-substitutions/set-substitutions.component';
import { SetTimeoutsComponent } from './set-timeouts/set-timeouts.component';
import { GamePlayersComponent } from './game-players/game-players.component';
import { GameSanctionsComponent } from './game-sanctions/game-sanctions.component';
import { SetLineupsComponent } from './set-lineups/set-lineups.component';
import { TimeGameComponent } from './time-game/time-game.component';
import { TimeGameSummaryComponent } from './time-game-summary/time-game-summary.component';
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
import { UserLeagueModalComponent } from './user-league-modal/user-league-modal.component';
import { LeagueComponent } from './league/league.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { ColorPickerModalComponent } from './color-picker-modal/color-picker-modal.component';
import { HomeComponent } from './home/home.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { UserColleaguesComponent } from './user-colleagues/user-colleagues.component';
import { UserColleagueModalComponent } from './user-colleague-modal/user-colleague-modal.component';
import { ColleagueRequestItemComponent } from './colleague-request-item/colleague-request-item.component';

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
    SearchResultTokenComponent,
    SearchResultLiveComponent,
    SearchResultDateComponent,
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
    StatisticsComponent,
    Indoor4x4GameComponent,
    Indoor4x4CourtComponent,
    SetSubstitutionsComponent,
    SetTimeoutsComponent,
    GamePlayersComponent,
    GameSanctionsComponent,
    SetLineupsComponent,
    TimeGameComponent,
    TimeGameSummaryComponent,
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
    UserLeagueModalComponent,
    LeagueComponent,
    PrivatePolicyComponent,
    RoleSelectorComponent,
    ColorPickerModalComponent,
    HomeComponent,
    SearchModalComponent,
    UserColleaguesComponent,
    UserColleagueModalComponent,
    ColleagueRequestItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxChartsModule
  ],
  providers: [
    AuthService,
    Utils,
    DatePipe,
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' }
  ],
  entryComponents: [
    UserRulesModalComponent,
    UserTeamModalComponent,
    UserGameModalComponent,
    UserLeagueModalComponent,
    OkCancelModalComponent,
    ColorPickerModalComponent,
    SearchModalComponent,
    UserColleagueModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
