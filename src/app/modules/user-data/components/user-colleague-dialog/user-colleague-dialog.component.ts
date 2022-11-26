import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  public colleagueFormGroup: UntypedFormGroup;

  constructor(
    private _dialogRef: MatDialogRef<UserColleagueDialogComponent>,
    private _userService: UserService,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    this.colleagueFormGroup = new UntypedFormGroup({
      pseudo: new UntypedFormControl('', [Validators.required]),
    });
  }

  get pseudoFormControl() {
    return this.colleagueFormGroup.get('pseudo');
  }

  public close(): void {
    this._dialogRef.close(null);
  }

  public onAddColleague(): void {
    const pseudo = this.pseudoFormControl.value;
    this._userService.sendFriendRequest(pseudo).subscribe({
      next: (_success) => this.onValidResponse(pseudo),
      error: (_) => this.onInvalidResponse(),
    });
  }

  private onValidResponse(pseudo: string): void {
    this._dialogRef.close(pseudo);
  }

  private onInvalidResponse(): void {
    this._translateService
      .get('user.colleague.messages.request-failed', { pseudo: this.pseudoFormControl.value })
      .subscribe((t) => this._snackBarService.showError(t));
  }
}
