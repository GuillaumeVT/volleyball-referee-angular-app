import { EmailCredentials } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm:         FormGroup;
  hidePassword:       boolean;
  passwordVisibility: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.hidePassword = false;
    this.togglePasswordVisibility();
    this.passwordVisibility = 'visibility_off';

    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get formEmail() { return this.signInForm.get('email'); }

  get formPassword() { return this.signInForm.get('password'); }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordVisibility = this.hidePassword ? 'visibility_off' : 'visibility';
  }

  signIn(): void {
    const emailCredentials = new EmailCredentials(this.formEmail.value, this.formPassword.value);
    this.userService.signIn(emailCredentials).subscribe(userToken => this.onValidResponse(), error => this.onInvalidResponse(error));
  }

  private onValidResponse(): void {}

  private onInvalidResponse(_error: any): void {
    this.snackBar.open('Email and password do not match.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  getPasswordLostUrl(): string {
    return '/password-lost';
  }

}
