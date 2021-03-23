import { UserService } from 'src/app/core/services/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetId: string;
  
  passwordResetFormGroup:  FormGroup;
  hidePassword:       boolean;
  passwordVisibility: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private snackBarService: SnackBarService) {
    this.hidePassword = false;
    this.togglePasswordVisibility();

    this.passwordResetFormGroup = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, this.passwordsMustMatchValidator);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.passwordResetId = params['passwordResetId']);
  }

  get newPasswordFormControl() { return this.passwordResetFormGroup.get('newPassword'); }

  get confirmedPasswordFormControl() { return this.passwordResetFormGroup.get('confirmedPassword'); }

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

  onResetPassword(): void {
    this.userService.resetPassword(this.passwordResetId, this.newPasswordFormControl.value).subscribe(tokenRequestResult => this.onValidResponse(), error => this.onInvalidResponse(error));
  }

  private onValidResponse(): void {
    this.snackBarService.showInfo('Your password was successfully reset.');
  }

  private onInvalidResponse(error: any): void {
    if (error.status === 400) {
      this.snackBarService.showError('Password does not satisfy the aforementioned criteria.');
    } else {
      this.snackBarService.showError('An error occurred on the server.');
    }
  }

}
