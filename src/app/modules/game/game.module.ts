import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BeachGameComponent } from '@game/components/beach-game/beach-game.component';
import { BeachCourtComponent } from '@game/components/court/beach-court/beach-court.component';
import { IndoorCourtComponent } from '@game/components/court/indoor-court/indoor-court.component';
import { Indoor4x4CourtComponent } from '@game/components/court/indoor4x4-court/indoor4x4-court.component';
import { SnowCourtComponent } from '@game/components/court/snow-court/snow-court.component';
import { GamePlayersComponent } from '@game/components/game-players/game-players.component';
import { GameRefreshComponent } from '@game/components/game-refresh/game-refresh.component';
import { GameSanctionsComponent } from '@game/components/game-sanctions/game-sanctions.component';
import { GameSummaryComponent } from '@game/components/game-summary/game-summary.component';
import { IndoorGameComponent } from '@game/components/indoor-game/indoor-game.component';
import { Indoor4x4GameComponent } from '@game/components/indoor4x4-game/indoor4x4-game.component';
import { IndoorSetLineupsComponent } from '@game/components/set/indoor-set-lineups/indoor-set-lineups.component';
import { Indoor4x4SetLineupsComponent } from '@game/components/set/indoor4x4-set-lineups/indoor4x4-set-lineups.component';
import { LadderEventDialogComponent } from '@game/components/set/ladder-event-dialog/ladder-event-dialog.component';
import { LadderComponent } from '@game/components/set/ladder/ladder.component';
import { SetSubstitutionsComponent } from '@game/components/set/set-substitutions/set-substitutions.component';
import { SetSummaryComponent } from '@game/components/set/set-summary/set-summary.component';
import { SetTimeoutsComponent } from '@game/components/set/set-timeouts/set-timeouts.component';
import { SnowSetLineupsComponent } from '@game/components/set/snow-set-lineups/snow-set-lineups.component';
import { SnowGameComponent } from '@game/components/snow-game/snow-game.component';
import { GameComponent } from '@game/pages/game/game.component';
import { SharedModule } from '@shared/shared.module';

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
    LadderEventDialogComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [GameComponent],
})
export class GameModule {}
