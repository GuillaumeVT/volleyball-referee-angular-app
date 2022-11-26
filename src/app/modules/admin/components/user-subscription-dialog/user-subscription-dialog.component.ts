import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionPurchase } from '@core/models/user.model';

@Component({
  selector: 'app-user-subscription-dialog',
  templateUrl: './user-subscription-dialog.component.html',
  styleUrls: ['./user-subscription-dialog.component.scss'],
})
export class UserSubscriptionDialogComponent {
  constructor(
    private _dialogRef: MatDialogRef<UserSubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public subscriptionPurchase: SubscriptionPurchase,
  ) {}

  close(): void {
    this._dialogRef.close(false);
  }
}
