import { UserDataModule } from 'src/app/modules/user-data/user-data.module';
import { AccountComponent } from 'src/app/modules/user-management/components/account/account.component';
import { HomeComponent } from 'src/app/modules/user-management/components/home/home.component';
import { PasswordLostComponent } from 'src/app/modules/user-management/components/password-lost/password-lost.component';
import { PasswordResetComponent } from 'src/app/modules/user-management/components/password-reset/password-reset.component';
import { SignInComponent } from 'src/app/modules/user-management/components/sign-in/sign-in.component';
import { StatisticsComponent } from 'src/app/modules/user-management/components/statistics/statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AccountComponent,
    HomeComponent,
    PasswordLostComponent,
    PasswordResetComponent,
    SignInComponent,
    StatisticsComponent
  ],
  imports: [
    NgxChartsModule,
    SharedModule,
    UserDataModule
  ],
  exports: [
    AccountComponent,
    HomeComponent,
    PasswordLostComponent,
    PasswordResetComponent,
    SignInComponent
  ]
})
export class UserManagementModule { }
