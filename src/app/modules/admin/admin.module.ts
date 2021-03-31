import { MaterialModule } from 'src/app/material/material.module';
import { UserSubscriptionDialogComponent } from 'src/app/modules/admin/components/user-subscription-dialog/user-subscription-dialog.component';
import { UserSubscriptionTokenDialogComponent } from 'src/app/modules/admin/components/user-subscription-token-dialog/user-subscription-token-dialog.component';
import { AdminUsersComponent } from 'src/app/modules/admin/pages/admin-users/admin-users.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AdminUsersComponent, UserSubscriptionDialogComponent, UserSubscriptionTokenDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule
  ]
})
export class AdminModule { }
