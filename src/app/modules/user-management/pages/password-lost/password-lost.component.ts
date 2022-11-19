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
  passwordLostFormGroup: UntypedFormGroup;

  constructor(private userService: UserService, private snackBarService: SnackBarService, private translate: TranslateService) {
    this.passwordLostFormGroup = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
    });
  }

  get emailFormControl() {
    return this.passwordLostFormGroup.get('email');
  }

  onInitiatePasswordReset(): void {
    const emailAddress = this.emailFormControl.value;
    this.userService.initiatePasswordReset(emailAddress).subscribe({
      next: (_) => this.onValidResponse(emailAddress),
      error: (_) => this.onInvalidResponse(emailAddress),
    });
  }

  private onValidResponse(emailAddress: string): void {
    this.translate
      .get('user.management.messages.recovery-sent', { emailAddress: emailAddress })
      .subscribe((t) => this.snackBarService.showInfo(t));
  }

  private onInvalidResponse(emailAddress: string): void {
    this.translate
      .get('user.management.messages.recovery-failed', { emailAddress: emailAddress })
      .subscribe((t) => this.snackBarService.showError(t));
  }
}
