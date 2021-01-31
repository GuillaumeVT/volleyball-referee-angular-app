import { ColleagueRequestItemComponent } from 'src/app/modules/user-data/components/user-colleagues/colleague-request-item/colleague-request-item.component';
import { UserColleagueModalComponent } from 'src/app/modules/user-data/components/user-colleagues/user-colleague-modal/user-colleague-modal.component';
import { UserColleaguesComponent } from 'src/app/modules/user-data/components/user-colleagues/user-colleagues.component';
import { GameRefereeModalComponent } from 'src/app/modules/user-data/components/user-games/game-referee-modal/game-referee-modal.component';
import { UserGameModalComponent } from 'src/app/modules/user-data/components/user-games/user-game-modal/user-game-modal.component';
import { UserGamesComponent } from 'src/app/modules/user-data/components/user-games/user-games.component';
import { UserLeagueModalComponent } from 'src/app/modules/user-data/components/user-leagues/user-league-modal/user-league-modal.component';
import { UserLeaguesComponent } from 'src/app/modules/user-data/components/user-leagues/user-leagues.component';
import { UserRulesModalComponent } from 'src/app/modules/user-data/components/user-rules/user-rules-modal/user-rules-modal.component';
import { UserRulesComponent } from 'src/app/modules/user-data/components/user-rules/user-rules.component';
import { ColorPickerModalComponent } from 'src/app/modules/user-data/components/user-teams/color-picker-modal/color-picker-modal.component';
import { PlayerNamesModalComponent } from 'src/app/modules/user-data/components/user-teams/player-names-modal/player-names-modal.component';
import { UserTeamModalComponent } from 'src/app/modules/user-data/components/user-teams/user-team-modal/user-team-modal.component';
import { UserTeamsComponent } from 'src/app/modules/user-data/components/user-teams/user-teams.component';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { LeagueService } from 'src/app/modules/user-data/services/league.service';
import { RulesService } from 'src/app/modules/user-data/services/rules.service';
import { TeamService } from 'src/app/modules/user-data/services/team.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    UserColleaguesComponent,
    UserColleagueModalComponent,
    ColleagueRequestItemComponent,
    UserLeaguesComponent,
    UserLeagueModalComponent,
    UserRulesComponent,
    UserRulesModalComponent,
    UserTeamsComponent,
    UserTeamModalComponent,
    ColorPickerModalComponent,
    PlayerNamesModalComponent,
    UserGamesComponent,
    UserGameModalComponent,
    GameRefereeModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserColleaguesComponent,
    ColleagueRequestItemComponent,
    UserLeaguesComponent,
    UserRulesComponent,
    UserRulesModalComponent,
    UserTeamsComponent,
    UserGamesComponent
  ]
})
export class UserDataModule { }
