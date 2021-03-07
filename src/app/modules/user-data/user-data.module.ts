import { ColorPickerModalComponent } from 'src/app/modules/user-data/components/color-picker-modal/color-picker-modal.component';
import { GameRefereeModalComponent } from 'src/app/modules/user-data/components/game-referee-modal/game-referee-modal.component';
import { PlayerNamesModalComponent } from 'src/app/modules/user-data/components/player-names-modal/player-names-modal.component';
import { UserColleagueModalComponent } from 'src/app/modules/user-data/components/user-colleague-modal/user-colleague-modal.component';
import { UserGameDialogComponent } from 'src/app/modules/user-data/components/user-game-dialog/user-game-dialog.component';
import { UserGameModalComponent } from 'src/app/modules/user-data/components/user-game-modal/user-game-modal.component';
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
    UserColleagueModalComponent,
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
    UserGameModalComponent,
    GameRefereeModalComponent
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
