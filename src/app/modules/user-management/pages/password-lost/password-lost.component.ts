import { UserService } from 'src/app/core/services/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.css']
})
export class PasswordLostComponent {

  passwordLostFormGroup: FormGroup;

  constructor(private userService: UserService, private snackBarService: SnackBarService) {
    this.passwordLostFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get emailFormControl() { return this.passwordLostFormGroup.get('email'); }

  initiatePasswordReset(): void {
    const emailAddress = this.emailFormControl.value;
    this.userService.initiatePasswordReset(emailAddress).subscribe(success => this.onValidResponse(emailAddress), _error => this.onInvalidResponse(emailAddress));
  }

  private onValidResponse(emailAddress: string): void {
    this.snackBarService.showInfo(`A recovery link was sent to ${emailAddress}.`);
  }

  private onInvalidResponse(emailAddress: string): void {
    this.snackBarService.showError(`${emailAddress} could not be found.`);
  }

}
