import { UserService } from 'src/app/core/services/user.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.css']
})
export class PasswordLostComponent {

  passwordLostForm: FormGroup;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.passwordLostForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get formEmail() { return this.passwordLostForm.get('email'); }

  initiatePasswordReset(): void {
    const emailAddress = this.formEmail.value;
    this.userService.initiatePasswordReset(emailAddress).subscribe(success => this.onValidResponse(emailAddress), _error => this.onInvalidResponse(emailAddress));
  }

  private onValidResponse(emailAddress: string): void {
    this.snackBar.open(`A recovery link was sent to ${emailAddress}`, 'Dismiss', { duration: 2500, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  private onInvalidResponse(emailAddress: string): void {
    this.snackBar.open(`${emailAddress} could not be found.`, 'Dismiss', { duration: 2500, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

}
