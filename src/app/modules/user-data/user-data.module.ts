import { ColorPickerModalComponent } from 'src/app/modules/user-data/components/color-picker-modal/color-picker-modal.component';
import { GameRefereeDialogComponent } from 'src/app/modules/user-data/components/game-referee-dialog/game-referee-dialog.component';
import { PlayerNamesModalComponent } from 'src/app/modules/user-data/components/player-names-modal/player-names-modal.component';
import { UserColleagueDialogComponent } from 'src/app/modules/user-data/components/user-colleague-dialog/user-colleague-dialog.component';
import { UserGameDialogComponent } from 'src/app/modules/user-data/components/user-game-dialog/user-game-dialog.component';
import { UserLeagueDialogComponent } from 'src/app/modules/user-data/components/user-league-dialog/user-league-dialog.component';
import { UserRulesModalComponent } from 'src/app/modules/user-data/components/user-rules-modal/user-rules-modal.component';
import { UserTeamModalComponent } from 'src/app/modules/user-data/components/user-team-modal/user-team-modal.component';
import { UserColleaguesComponent } from 'src/app/modules/user-data/pages/user-colleagues/user-colleagues.component';
import { UserGamesComponent } from 'src/app/modules/user-data/pages/user-games/user-games.component';
import { UserLeaguesComponent } from 'src/app/modules/user-data/pages/user-leagues/user-leagues.component';
import { UserRulesComponent } from 'src/app/modules/user-data/pages/user-rules/user-rules.component';
import { UserTeamsComponent } from 'src/app/modules/user-data/pages/user-teams/user-teams.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    UserColleaguesComponent,
    UserLeaguesComponent,
    UserLeagueDialogComponent,
    UserRulesComponent,
    UserRulesModalComponent,
    UserTeamsComponent,
    UserTeamModalComponent,
    ColorPickerModalComponent,
    PlayerNamesModalComponent,
    UserGamesComponent,
    UserGameDialogComponent,
    GameRefereeDialogComponent,
    UserColleagueDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserColleaguesComponent,
    UserLeaguesComponent,
    UserRulesComponent,
    UserRulesModalComponent,
    UserTeamsComponent,
    UserGamesComponent
  ]
})
export class UserDataModule { }
