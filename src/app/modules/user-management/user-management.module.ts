import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { UserDataModule } from '@user-data/user-data.module';
import { AccountComponent } from '@user-management/pages/account/account.component';
import { HomeComponent } from '@user-management/pages/home/home.component';
import { PasswordLostComponent } from '@user-management/pages/password-lost/password-lost.component';
import { PasswordResetComponent } from '@user-management/pages/password-reset/password-reset.component';
import { SignInComponent } from '@user-management/pages/sign-in/sign-in.component';

@NgModule({
  declarations: [AccountComponent, HomeComponent, PasswordLostComponent, PasswordResetComponent, SignInComponent],
  imports: [MaterialModule, SharedModule, UserDataModule],
  exports: [AccountComponent, HomeComponent, PasswordLostComponent, PasswordResetComponent, SignInComponent],
})
export class UserManagementModule {}
