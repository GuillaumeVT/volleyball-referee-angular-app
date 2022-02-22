import { UserService } from 'src/app/core/services/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.scss'],
})
export class PasswordLostComponent {
  passwordLostFormGroup: FormGroup;

  constructor(private userService: UserService, private snackBarService: SnackBarService, private translate: TranslateService) {
    this.passwordLostFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get emailFormControl() {
    return this.passwordLostFormGroup.get('email');
  }

  onInitiatePasswordReset(): void {
    const emailAddress = this.emailFormControl.value;
    this.userService.initiatePasswordReset(emailAddress).subscribe(
      (success) => this.onValidResponse(emailAddress),
      (_error) => this.onInvalidResponse(emailAddress),
    );
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
