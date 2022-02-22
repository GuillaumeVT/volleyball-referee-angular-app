import { AdminModule } from '@admin/admin.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { GameModule } from '@game/game.module';
import { LeagueModule } from '@league/league.module';
import { MaterialModule } from '@material/material.module';
import { SearchModule } from '@search/search.module';
import { SharedModule } from '@shared/shared.module';
import { UserDataModule } from '@user-data/user-data.module';
import { UserManagementModule } from '@user-management/user-management.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    SearchModule,
    GameModule,
    LeagueModule,
    UserDataModule,
    UserManagementModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
