import { UserService } from 'src/app/core/services/user.service';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  passwordResetId: string;
  
  passwordResetForm:  FormGroup;
  hidePassword:       boolean;
  passwordVisibility: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
    this.hidePassword = false;
    this.togglePasswordVisibility();

    this.passwordResetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, this.passwordsMustMatchValidator);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.passwordResetId = params['passwordResetId']);
  }

  get formNewPassword() { return this.passwordResetForm.get('newPassword'); }

  get formConfirmedPassword() { return this.passwordResetForm.get('confirmedPassword'); }

  private passwordsMustMatchValidator(abstractControl: AbstractControl): { mismatch: boolean } {
    if ((abstractControl.get('newPassword').value && abstractControl.get('confirmedPassword').value)
      && (abstractControl.get('newPassword').value !== abstractControl.get('confirmedPassword').value)) {
      return { mismatch: true };  
    } else {
      return null;
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordVisibility = this.hidePassword ? 'visibility_off' : 'visibility';
  }

  resetPassword(): void {
    this.userService.resetPassword(this.passwordResetId, this.formNewPassword.value).subscribe(tokenRequestResult => this.onValidResponse(), error => this.onInvalidResponse(error));
  }

  private onValidResponse(): void {
    this.snackBar.open('Your password was successfully reset.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  private onInvalidResponse(error: any): void {
    if (error.status === 400) {
      this.snackBar.open('Password does not satisfy the aforementioned criteria.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
    } else {
      this.snackBar.open('An error occurred on the server.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
    }
  }

}
