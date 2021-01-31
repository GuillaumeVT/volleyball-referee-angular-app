import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CoreModule } from 'src/app/core/core.module';
import { GameModule } from 'src/app/modules/game/game.module';
import { LeagueModule } from 'src/app/modules/league/league.module';
import { SearchModule } from 'src/app/modules/search/search.module';
import { UserDataModule } from 'src/app/modules/user-data/user-data.module';
import { UserManagementModule } from 'src/app/modules/user-management/user-management.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SearchModule,
    GameModule,
    LeagueModule,
    UserDataModule,
    UserManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
