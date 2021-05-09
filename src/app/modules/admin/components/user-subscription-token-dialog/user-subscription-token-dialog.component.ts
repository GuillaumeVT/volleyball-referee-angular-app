import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-subscription-token-dialog',
  templateUrl: './user-subscription-token-dialog.component.html',
  styleUrls: ['./user-subscription-token-dialog.component.scss']
})
export class UserSubscriptionTokenDialogComponent {

  userSubscriptionFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserSubscriptionTokenDialogComponent>, @Inject(MAT_DIALOG_DATA) public currentPurchaseToken: string) {
    this.userSubscriptionFormGroup = new FormGroup({
      purchaseToken: new FormControl({ value: this.currentPurchaseToken, disabled: false }, [Validators.required, Validators.minLength(144), Validators.maxLength(187)])
    });
  }

  get purchaseTokenFormControl() { return this.userSubscriptionFormGroup.get('purchaseToken'); }

  close(): void {
    this.dialogRef.close(null);
  }

  onUpdateUserSubscription(): void {
    this.dialogRef.close(this.purchaseTokenFormControl.value);
  }
}
