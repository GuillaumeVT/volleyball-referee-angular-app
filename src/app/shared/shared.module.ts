import { FileSaverModule } from 'ngx-filesaver';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { GameListItemComponent } from 'src/app/shared/components/game-list-item/game-list-item.component';
import { GameListComponent } from 'src/app/shared/components/game-list/game-list.component';
import { LinksBarComponent } from 'src/app/shared/components/links-bar/links-bar.component';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from 'src/app/shared/components/privacy-policy/privacy-policy.component';
import { GenderPipe } from 'src/app/shared/pipes/gender.pipe';

import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LinksBarComponent,
    PrivacyPolicyComponent,
    PageNotFoundComponent,
    GameListComponent,
    GameListItemComponent,
    GenderPipe,
    OkCancelModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileSaverModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    FormsModule,
    RouterModule,
    ToastrModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FileSaverModule,
    GenderPipe,
    LinksBarComponent,
    PrivacyPolicyComponent,
    PageNotFoundComponent,
    GameListComponent,
    GameListItemComponent,
    OkCancelModalComponent
  ]
})
export class SharedModule { }
