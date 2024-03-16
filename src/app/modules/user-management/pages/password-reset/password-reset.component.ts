import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  private _passwordResetId: string;

  public passwordResetFormGroup: UntypedFormGroup;
  public hidePassword: boolean;
  public passwordVisibility: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    this.hidePassword = false;
    this.togglePasswordVisibility();

    this.passwordResetFormGroup = new UntypedFormGroup(
      {
        newPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
        confirmedPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      },
      this.passwordsMustMatchValidator,
    );
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => (this._passwordResetId = params['passwordResetId']));
  }

  get newPasswordFormControl() {
    return this.passwordResetFormGroup.get('newPassword');
  }

  get confirmedPasswordFormControl() {
    return this.passwordResetFormGroup.get('confirmedPassword');
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

  public onResetPassword(): void {
    this._userService.resetPassword(this._passwordResetId, this.newPasswordFormControl.value).subscribe({
      next: (_) => this.onValidResponse(),
      error: (error) => this.onInvalidResponse(error),
    });
  }

  private onValidResponse(): void {
    this._translateService.get('user.management.messages.password-updated').subscribe((t) => this._snackBarService.showInfo(t));
  }

  private onInvalidResponse(error: any): void {
    if (error.status === HttpStatusCode.BadRequest) {
      this._translateService.get('user.management.messages.password-invalid-error').subscribe((t) => this._snackBarService.showError(t));
    } else {
      this._translateService.get('user.management.messages.internal-error').subscribe((t) => this._snackBarService.showError(t));
    }
  }
}
