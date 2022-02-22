import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DivisionRankingsComponent } from '@league/components/division-rankings/division-rankings.component';
import { LeagueDashboardComponent } from '@league/components/league-dashboard/league-dashboard.component';
import { LeagueGamesComponent } from '@league/components/league-games/league-games.component';
import { LeagueComponent } from '@league/pages/league/league.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LeagueComponent, DivisionRankingsComponent, LeagueDashboardComponent, LeagueGamesComponent],
  imports: [CommonModule, SharedModule],
  exports: [LeagueComponent],
})
export class LeagueModule {}
