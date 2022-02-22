import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-user-colleague-dialog',
  templateUrl: './user-colleague-dialog.component.html',
  styleUrls: ['./user-colleague-dialog.component.scss'],
})
export class UserColleagueDialogComponent {
  colleagueFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserColleagueDialogComponent>,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private translate: TranslateService,
  ) {
    this.colleagueFormGroup = new FormGroup({
      pseudo: new FormControl('', [Validators.required]),
    });
  }

  get pseudoFormControl() {
    return this.colleagueFormGroup.get('pseudo');
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onAddColleague(): void {
    const pseudo = this.pseudoFormControl.value;
    this.userService.sendFriendRequest(pseudo).subscribe(
      (_success) => this.onValidResponse(pseudo),
      (_error) => this.onInvalidResponse(),
    );
  }

  onValidResponse(pseudo: string): void {
    this.dialogRef.close(pseudo);
  }

  onInvalidResponse(): void {
    this.translate
      .get('user.colleague.messages.request-failed', { pseudo: this.pseudoFormControl.value })
      .subscribe((t) => this.snackBarService.showError(t));
  }
}
