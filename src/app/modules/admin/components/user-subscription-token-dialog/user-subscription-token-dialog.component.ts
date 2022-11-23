import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-subscription-token-dialog',
  templateUrl: './user-subscription-token-dialog.component.html',
  styleUrls: ['./user-subscription-token-dialog.component.scss'],
})
export class UserSubscriptionTokenDialogComponent {
  public userSubscriptionFormGroup: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserSubscriptionTokenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public currentPurchaseToken: string,
  ) {
    this.userSubscriptionFormGroup = new UntypedFormGroup({
      purchaseToken: new UntypedFormControl({ value: this.currentPurchaseToken, disabled: false }, [
        Validators.required,
        Validators.minLength(144),
        Validators.maxLength(187),
      ]),
    });
  }

  get purchaseTokenFormControl() {
    return this.userSubscriptionFormGroup.get('purchaseToken');
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public onUpdateUserSubscription(): void {
    this.dialogRef.close(this.purchaseTokenFormControl.value);
  }
}
