import { EmailCredentials } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInFormGroup:         FormGroup;
  hidePassword:       boolean;
  passwordVisibility: string;

  constructor(private userService: UserService, private snackBarService: SnackBarService) {
    this.hidePassword = false;
    this.togglePasswordVisibility();
    this.passwordVisibility = 'visibility_off';

    this.signInFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get emailFormControl() { return this.signInFormGroup.get('email'); }

  get passwordFormControl() { return this.signInFormGroup.get('password'); }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordVisibility = this.hidePassword ? 'visibility_off' : 'visibility';
  }

  onSignIn(): void {
    const emailCredentials = new EmailCredentials(this.emailFormControl.value, this.passwordFormControl.value);
    this.userService.signIn(emailCredentials).subscribe(userToken => this.onValidResponse(), error => this.onInvalidResponse(error));
  }

  private onValidResponse(): void {}

  private onInvalidResponse(_error: any): void {
    this.snackBarService.showError('Email and password do not match.');
  }

  getPasswordLostUrl(): string {
    return '/password-lost';
  }

}
