import { DivisionRankingsComponent } from 'src/app/modules/league/components/division-rankings/division-rankings.component';
import { LeagueDashboardComponent } from 'src/app/modules/league/components/league-dashboard/league-dashboard.component';
import { LeagueGamesComponent } from 'src/app/modules/league/components/league-games/league-games.component';
import { LeagueComponent } from 'src/app/modules/league/pages/league/league.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LeagueComponent, DivisionRankingsComponent, LeagueDashboardComponent, LeagueGamesComponent],
  imports: [CommonModule, SharedModule],
  exports: [LeagueComponent],
})
export class LeagueModule {}
