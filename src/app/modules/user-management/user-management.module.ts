import { MaterialModule } from 'src/app/material/material.module';
import { UserDataModule } from 'src/app/modules/user-data/user-data.module';
import { AccountComponent } from 'src/app/modules/user-management/pages/account/account.component';
import { HomeComponent } from 'src/app/modules/user-management/pages/home/home.component';
import { PasswordLostComponent } from 'src/app/modules/user-management/pages/password-lost/password-lost.component';
import { PasswordResetComponent } from 'src/app/modules/user-management/pages/password-reset/password-reset.component';
import { SignInComponent } from 'src/app/modules/user-management/pages/sign-in/sign-in.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AccountComponent, HomeComponent, PasswordLostComponent, PasswordResetComponent, SignInComponent],
  imports: [MaterialModule, SharedModule, UserDataModule],
  exports: [AccountComponent, HomeComponent, PasswordLostComponent, PasswordResetComponent, SignInComponent],
})
export class UserManagementModule {}
