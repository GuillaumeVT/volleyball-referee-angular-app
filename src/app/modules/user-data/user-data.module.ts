import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorPickerDialogComponent } from '@user-data/components/color-picker-dialog/color-picker-dialog.component';
import { GameRefereeDialogComponent } from '@user-data/components/game-referee-dialog/game-referee-dialog.component';
import { PlayerNamesDialogComponent } from '@user-data/components/player-names-dialog/player-names-dialog.component';
import { UserColleagueDialogComponent } from '@user-data/components/user-colleague-dialog/user-colleague-dialog.component';
import { UserGameDialogComponent } from '@user-data/components/user-game-dialog/user-game-dialog.component';
import { UserLeagueDialogComponent } from '@user-data/components/user-league-dialog/user-league-dialog.component';
import { UserRulesDialogComponent } from '@user-data/components/user-rules-dialog/user-rules-dialog.component';
import { UserTeamDialogComponent } from '@user-data/components/user-team-dialog/user-team-dialog.component';
import { UserColleaguesComponent } from '@user-data/pages/user-colleagues/user-colleagues.component';
import { UserGamesComponent } from '@user-data/pages/user-games/user-games.component';
import { UserLeaguesComponent } from '@user-data/pages/user-leagues/user-leagues.component';
import { UserRulesComponent } from '@user-data/pages/user-rules/user-rules.component';
import { UserTeamsComponent } from '@user-data/pages/user-teams/user-teams.component';

@NgModule({
  declarations: [
    UserColleaguesComponent,
    UserLeaguesComponent,
    UserLeagueDialogComponent,
    UserRulesComponent,
    UserTeamsComponent,
    UserGamesComponent,
    UserGameDialogComponent,
    GameRefereeDialogComponent,
    UserColleagueDialogComponent,
    ColorPickerDialogComponent,
    PlayerNamesDialogComponent,
    UserTeamDialogComponent,
    UserRulesDialogComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [UserColleaguesComponent, UserLeaguesComponent, UserRulesComponent, UserTeamsComponent, UserGamesComponent],
})
export class UserDataModule {}
