import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserPasswordUpdate, UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public user: UserSummary;

  public passwordUpdateFormGroup: UntypedFormGroup;
  public hidePassword: boolean;
  public passwordVisibility: string;

  constructor(private _userService: UserService, private _snackBarService: SnackBarService, private _translateService: TranslateService) {
    this.hidePassword = false;
    this.togglePasswordVisibility();

    this.passwordUpdateFormGroup = new UntypedFormGroup(
      {
        currentPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
        newPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
        confirmedPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      },
      this.passwordsMustMatchValidator,
    );
  }

  public ngOnInit(): void {
    this._userService.authState.subscribe((auth) => (this.user = auth ? auth.user : null));
  }

  get currentPasswordFormControl() {
    return this.passwordUpdateFormGroup.get('currentPassword');
  }

  get newPasswordFormControl() {
    return this.passwordUpdateFormGroup.get('newPassword');
  }

  get confirmedPasswordFormControl() {
    return this.passwordUpdateFormGroup.get('confirmedPassword');
  }

  private passwordsMustMatchValidator(abstractControl: AbstractControl): { mismatch: boolean } {
    if (
      abstractControl.get('newPassword').value &&
      abstractControl.get('confirmedPassword').value &&
      abstractControl.get('newPassword').value !== abstractControl.get('confirmedPassword').value
    ) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordVisibility = this.hidePassword ? 'visibility_off' : 'visibility';
  }

  public onUpdateUserPassword(): void {
    const userPasswordUpdate = new UserPasswordUpdate(this.currentPasswordFormControl.value, this.newPasswordFormControl.value);
    this._userService.updateUserPassword(userPasswordUpdate).subscribe({
      next: (_) => this.onValidResponse(),
      error: (error) => this.onInvalidResponse(error),
    });
  }

  private onValidResponse(): void {
    this._translateService.get('user.management.messages.password-updated').subscribe((t) => this._snackBarService.showInfo(t));
  }

  private onInvalidResponse(error: any): void {
    if (error.status === 400) {
      this._translateService.get('user.management.messages.password-invalid-error').subscribe((t) => this._snackBarService.showError(t));
    } else {
      this._translateService.get('user.management.messages.internal-error').subscribe((t) => this._snackBarService.showError(t));
    }
  }
}
