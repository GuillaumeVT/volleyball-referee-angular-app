import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-subscription-token-dialog',
  templateUrl: './user-subscription-token-dialog.component.html',
  styleUrls: ['./user-subscription-token-dialog.component.scss']
})
export class UserSubscriptionTokenDialogComponent {

  userSubscriptionFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserSubscriptionTokenDialogComponent>) {
    this.userSubscriptionFormGroup = new FormGroup({
      purchaseToken: new FormControl('', [Validators.required])
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
