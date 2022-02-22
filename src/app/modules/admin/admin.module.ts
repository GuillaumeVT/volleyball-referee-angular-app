import { UserSubscriptionDialogComponent } from '@admin/components/user-subscription-dialog/user-subscription-dialog.component';
import { UserSubscriptionTokenDialogComponent } from '@admin/components/user-subscription-token-dialog/user-subscription-token-dialog.component';
import { AdminUsersComponent } from '@admin/pages/admin-users/admin-users.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [AdminUsersComponent, UserSubscriptionDialogComponent, UserSubscriptionTokenDialogComponent],
  imports: [CommonModule, MaterialModule, CoreModule],
})
export class AdminModule {}
