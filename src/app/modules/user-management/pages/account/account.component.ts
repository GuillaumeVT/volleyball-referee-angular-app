import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
  user: UserSummary;

  passwordUpdateFormGroup: FormGroup;
  hidePassword: boolean;
  passwordVisibility: string;

  constructor(private userService: UserService, private snackBarService: SnackBarService, private translate: TranslateService) {
    this.hidePassword = false;
    this.togglePasswordVisibility();

    this.passwordUpdateFormGroup = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      },
      this.passwordsMustMatchValidator,
    );
  }

  ngOnInit() {
    this.userService.authState.subscribe((auth) => (this.user = auth ? auth.user : null));
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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordVisibility = this.hidePassword ? 'visibility_off' : 'visibility';
  }

  onUpdateUserPassword(): void {
    const userPasswordUpdate = new UserPasswordUpdate(this.currentPasswordFormControl.value, this.newPasswordFormControl.value);
    this.userService.updateUserPassword(userPasswordUpdate).subscribe(
      (tokenRequestResult) => this.onValidResponse(),
      (error) => this.onInvalidResponse(error),
    );
  }

  private onValidResponse(): void {
    this.translate.get('user.management.messages.password-updated').subscribe((t) => this.snackBarService.showInfo(t));
  }

  private onInvalidResponse(error: any): void {
    if (error.status === 400) {
      this.translate.get('user.management.messages.password-invalid-error').subscribe((t) => this.snackBarService.showError(t));
    } else {
      this.translate.get('user.management.messages.internal-error').subscribe((t) => this.snackBarService.showError(t));
    }
  }
}
