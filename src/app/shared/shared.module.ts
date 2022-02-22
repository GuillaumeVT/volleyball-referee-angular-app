import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { MaterialModule } from '@material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { GameListItemComponent } from '@shared/components/game-list-item/game-list-item.component';
import { GameListComponent } from '@shared/components/game-list/game-list.component';
import { StatisticsComponent } from '@shared/components/statistics/statistics.component';
import { GenderPipe } from '@shared/pipes/gender.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ConfirmationDialogComponent, StatisticsComponent, GameListComponent, GameListItemComponent, GenderPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    NgxChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
  ],
  providers: [DatePipe, GenderPipe, { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' }],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ConfirmationDialogComponent,
    GenderPipe,
    StatisticsComponent,
    GameListComponent,
    GameListItemComponent,
    TranslateModule,
  ],
})
export class SharedModule {}
