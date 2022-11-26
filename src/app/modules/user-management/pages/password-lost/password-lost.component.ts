import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.scss'],
})
export class PasswordLostComponent {
  public passwordLostFormGroup: UntypedFormGroup;

  constructor(private _userService: UserService, private _snackBarService: SnackBarService, private _translateService: TranslateService) {
    this.passwordLostFormGroup = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
    });
  }

  get emailFormControl() {
    return this.passwordLostFormGroup.get('email');
  }

  public onInitiatePasswordReset(): void {
    const emailAddress = this.emailFormControl.value;
    this._userService.initiatePasswordReset(emailAddress).subscribe({
      next: (_) => this.onValidResponse(emailAddress),
      error: (_) => this.onInvalidResponse(emailAddress),
    });
  }

  private onValidResponse(emailAddress: string): void {
    this._translateService
      .get('user.management.messages.recovery-sent', { emailAddress: emailAddress })
      .subscribe((t) => this._snackBarService.showInfo(t));
  }

  private onInvalidResponse(emailAddress: string): void {
    this._translateService
      .get('user.management.messages.recovery-failed', { emailAddress: emailAddress })
      .subscribe((t) => this._snackBarService.showError(t));
  }
}
