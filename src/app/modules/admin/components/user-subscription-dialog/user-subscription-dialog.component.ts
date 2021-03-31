import { SubscriptionPurchase } from 'src/app/core/models/user.model';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-subscription-dialog',
  templateUrl: './user-subscription-dialog.component.html',
  styleUrls: ['./user-subscription-dialog.component.scss']
})
export class UserSubscriptionDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserSubscriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public subscriptionPurchase: SubscriptionPurchase) { }

  close(): void {
    this.dialogRef.close(false);
  }
}
