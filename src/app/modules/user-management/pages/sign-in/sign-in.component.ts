import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { EmailCredentials } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInFormGroup: FormGroup;
  hidePassword: boolean;
  passwordVisibility: string;

  constructor(private userService: UserService, private snackBarService: SnackBarService, private translate: TranslateService) {
    this.hidePassword = false;
    this.togglePasswordVisibility();
    this.passwordVisibility = 'visibility_off';

    this.signInFormGroup = new UntypedFormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get emailFormControl() {
    return this.signInFormGroup.get('email');
  }

  get passwordFormControl() {
    return this.signInFormGroup.get('password');
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordVisibility = this.hidePassword ? 'visibility_off' : 'visibility';
  }

  onSignIn(): void {
    const emailCredentials = new EmailCredentials(this.emailFormControl.value, this.passwordFormControl.value);
    this.userService.signIn(emailCredentials).subscribe({
      next: (_) => this.onValidResponse(),
      error: (_) => this.onInvalidResponse(),
    });
  }

  private onValidResponse(): void {}

  private onInvalidResponse(): void {
    this.translate.get('user.management.messages.credentials-mismatch-error').subscribe((t) => this.snackBarService.showError(t));
  }

  getPasswordLostUrl(): string {
    return '/password-lost';
  }
}
