import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit, AfterViewInit {

  passwordResetId: string;
  password:        string;
  password2:       string;

  emptyPassword:      boolean;
  emptyPassword2:     boolean;
  differentPasswords: boolean;
  invalidPassword :   boolean;
  invalidResponse :   boolean;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.password = "";
    this.password2 = "";
    this.emptyPassword = false;
    this.emptyPassword2 = false;
    this.differentPasswords = false;
    this.invalidPassword = false;
    this.invalidResponse = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.passwordResetId = params['passwordResetId']);
  }

  ngAfterViewInit() {
    const firstNameInput = document.getElementById('password');
    if (firstNameInput) {
      firstNameInput.focus();
    }
  }

  resetPassword(): void {
    this.invalidResponse = false;
    this.invalidPassword = false;
    this.emptyPassword = (this.password.length === 0);
    this.emptyPassword2 = (this.password2.length === 0);
    this.differentPasswords = (this.password  !== this.password2);

    const invalidForm : boolean = this.emptyPassword || this.emptyPassword2 || this.differentPasswords;

    if (!invalidForm) {
      this.userService.resetPassword(this.passwordResetId, this.password).subscribe(tokenRequestResult => this.onValidResponse(), error => this.onInvalidResponse(error));
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.invalidPassword = false;
  }

  onInvalidResponse(error): void {
    this.invalidResponse = false;
    this.invalidPassword = false;

    if (error.status === 400) {
      this.invalidPassword = true;
    } else {
      this.invalidResponse = true;
    }
  }

}
