import { UserPasswordUpdate, UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: UserSummary;

  passwordUpdateForm: FormGroup;
  hidePassword:       boolean;
  passwordVisibility: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.hidePassword = false;
    this.togglePasswordVisibility();

    this.passwordUpdateForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, this.passwordsMustMatchValidator);
  }

  ngOnInit() {
    this.userService.authState.subscribe(auth => this.user = auth ? auth.user : null);
  }

  get formCurrentPassword() { return this.passwordUpdateForm.get('currentPassword'); }

  get formNewPassword() { return this.passwordUpdateForm.get('newPassword'); }

  get formConfirmedPassword() { return this.passwordUpdateForm.get('confirmedPassword'); }

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

  updateUserPassword(): void {
    const userPasswordUpdate = new UserPasswordUpdate(this.formCurrentPassword.value, this.formNewPassword.value);
    this.userService.updateUserPassword(userPasswordUpdate).subscribe(tokenRequestResult => this.onValidResponse(), error => this.onInvalidResponse(error));
  }

  private onValidResponse(): void {
    this.snackBar.open('Your password was successfully updated.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  private onInvalidResponse(error: any): void {
    if (error.status === 400) {
      this.snackBar.open('Password does not satisfy the aforementioned criteria.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
    } else {
      this.snackBar.open('An error occurred on the server.', 'Dismiss', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
    }
  }

}
