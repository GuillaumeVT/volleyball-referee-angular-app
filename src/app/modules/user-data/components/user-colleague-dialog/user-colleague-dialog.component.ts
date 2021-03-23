import { UserService } from 'src/app/core/services/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-colleague-dialog',
  templateUrl: './user-colleague-dialog.component.html',
  styleUrls: ['./user-colleague-dialog.component.scss']
})
export class UserColleagueDialogComponent {

  colleagueFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserColleagueDialogComponent>, private userService: UserService, private snackBarService: SnackBarService) {
    this.colleagueFormGroup = new FormGroup({
      pseudo: new FormControl('', [Validators.required])
    });
  }

  get pseudoFormControl() { return this.colleagueFormGroup.get('pseudo'); }

  close(): void {
    this.dialogRef.close(null);
  }

  onAddColleague(): void {
    const pseudo = this.pseudoFormControl.value;
    this.userService.sendFriendRequest(pseudo).subscribe(success => this.onValidResponse(pseudo), error => this.onInvalidResponse());
  }

  onValidResponse(pseudo: string): void {
    this.dialogRef.close(pseudo);
  }

  onInvalidResponse(): void {
    this.snackBarService.showError(`The request to ${this.pseudoFormControl.value} could not be sent. Is the pseudo valid?`);
  }
}
