import { BeachGameComponent } from 'src/app/modules/game/components/beach-game/beach-game.component';
import { BeachCourtComponent } from 'src/app/modules/game/components/court/beach-court/beach-court.component';
import { IndoorCourtComponent } from 'src/app/modules/game/components/court/indoor-court/indoor-court.component';
import { Indoor4x4CourtComponent } from 'src/app/modules/game/components/court/indoor4x4-court/indoor4x4-court.component';
import { SnowCourtComponent } from 'src/app/modules/game/components/court/snow-court/snow-court.component';
import { GamePlayersComponent } from 'src/app/modules/game/components/game-players/game-players.component';
import { GameRefreshComponent } from 'src/app/modules/game/components/game-refresh/game-refresh.component';
import { GameSanctionsComponent } from 'src/app/modules/game/components/game-sanctions/game-sanctions.component';
import { GameSummaryComponent } from 'src/app/modules/game/components/game-summary/game-summary.component';
import { IndoorGameComponent } from 'src/app/modules/game/components/indoor-game/indoor-game.component';
import { Indoor4x4GameComponent } from 'src/app/modules/game/components/indoor4x4-game/indoor4x4-game.component';
import { IndoorSetLineupsComponent } from 'src/app/modules/game/components/set/indoor-set-lineups/indoor-set-lineups.component';
import { Indoor4x4SetLineupsComponent } from 'src/app/modules/game/components/set/indoor4x4-set-lineups/indoor4x4-set-lineups.component';
import { LadderEventDialogComponent } from 'src/app/modules/game/components/set/ladder-event-dialog/ladder-event-dialog.component';
import { LadderComponent } from 'src/app/modules/game/components/set/ladder/ladder.component';
import { SetSubstitutionsComponent } from 'src/app/modules/game/components/set/set-substitutions/set-substitutions.component';
import { SetSummaryComponent } from 'src/app/modules/game/components/set/set-summary/set-summary.component';
import { SetTimeoutsComponent } from 'src/app/modules/game/components/set/set-timeouts/set-timeouts.component';
import { SnowSetLineupsComponent } from 'src/app/modules/game/components/set/snow-set-lineups/snow-set-lineups.component';
import { SnowGameComponent } from 'src/app/modules/game/components/snow-game/snow-game.component';
import { GameComponent } from 'src/app/modules/game/pages/game/game.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    GameComponent,
    IndoorGameComponent,
    IndoorCourtComponent,
    IndoorSetLineupsComponent,
    BeachGameComponent,
    BeachCourtComponent,
    Indoor4x4GameComponent,
    Indoor4x4CourtComponent,
    Indoor4x4SetLineupsComponent,
    SnowGameComponent,
    SnowCourtComponent,
    SnowSetLineupsComponent,
    GamePlayersComponent,
    GameRefreshComponent,
    GameSanctionsComponent,
    GameSummaryComponent,
    LadderComponent,
    SetSubstitutionsComponent,
    SetSummaryComponent,
    SetTimeoutsComponent,
    LadderEventDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
