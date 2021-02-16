import { FileSaverModule } from 'ngx-filesaver';
import { MaterialModule } from 'src/app/material/material.module';
import { GameListItemComponent } from 'src/app/shared/components/game-list-item/game-list-item.component';
import { GameListComponent } from 'src/app/shared/components/game-list/game-list.component';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';
import { StatisticsComponent } from 'src/app/shared/components/statistics/statistics.component';
import { GenderPipe } from 'src/app/shared/pipes/gender.pipe';

import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    StatisticsComponent,
    GameListComponent,
    GameListItemComponent,
    GenderPipe,
    OkCancelModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    NgbModule,
    NgxChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileSaverModule
  ],
  providers: [
    DatePipe,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileSaverModule,
    GenderPipe,
    StatisticsComponent,
    GameListComponent,
    GameListItemComponent,
    OkCancelModalComponent
  ]
})
export class SharedModule { }
