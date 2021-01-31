import { ToastrService } from 'ngx-toastr';
import { UserPasswordUpdate, UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: UserSummary;

  userPasswordUpdate: UserPasswordUpdate;
  confirmedPassword:  string;

  emptyCurrentPassword: boolean;
  emptyNewPassword:     boolean;
  emptyNewPassword2:    boolean;
  differentPasswords:   boolean;
  invalidPassword:      boolean;
  invalidResponse:      boolean;

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.userPasswordUpdate = new UserPasswordUpdate("", "");
    this.confirmedPassword = "";

    this.emptyCurrentPassword = false;
    this.emptyNewPassword = false;
    this.emptyNewPassword2 = false;
    this.differentPasswords = false;
    this.invalidPassword = false;
    this.invalidResponse = false;
  }

  ngOnInit() {
    this.userService.authState.subscribe(auth => this.user = auth ? auth.user : null);
  }

  updateUserPassword(): void {
    this.emptyCurrentPassword = (this.userPasswordUpdate.currentPassword.length === 0);
    this.emptyNewPassword = (this.userPasswordUpdate.newPassword.length === 0);
    this.emptyNewPassword2 = (this.confirmedPassword.length === 0);
    this.differentPasswords = (this.userPasswordUpdate.newPassword  !== this.confirmedPassword);

    const invalidForm : boolean = this.emptyCurrentPassword || this.emptyNewPassword || this.emptyNewPassword2 || this.differentPasswords;

    if (!invalidForm) {
      this.userService.updateUserPassword(this.userPasswordUpdate).subscribe(tokenRequestResult => this.onValidResponse(), error => this.onInvalidResponse(error));
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.invalidPassword = false;
    this.toastr.success('Your password was successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' })
  }

  onInvalidResponse(error: any): void {
    this.invalidResponse = false;
    this.invalidPassword = false;

    if (error.status === 400) {
      this.invalidPassword = true;
    } else {
      this.invalidResponse = true;
    }
  }

}
