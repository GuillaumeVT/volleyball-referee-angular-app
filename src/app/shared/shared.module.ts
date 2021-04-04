import { FileSaverModule } from 'ngx-filesaver';
import { MaterialModule } from 'src/app/material/material.module';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { GameListItemComponent } from 'src/app/shared/components/game-list-item/game-list-item.component';
import { GameListComponent } from 'src/app/shared/components/game-list/game-list.component';
import { StatisticsComponent } from 'src/app/shared/components/statistics/statistics.component';
import { GenderPipe } from 'src/app/shared/pipes/gender.pipe';

import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    StatisticsComponent,
    GameListComponent,
    GameListItemComponent,
    GenderPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    NgxChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileSaverModule
  ],
  providers: [
    DatePipe,
    GenderPipe,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileSaverModule,
    ConfirmationDialogComponent,
    GenderPipe,
    StatisticsComponent,
    GameListComponent,
    GameListItemComponent,
    TranslateModule
  ]
})
export class SharedModule { }
