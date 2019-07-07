import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EmailCredentials } from '../../model/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {

  emailCredentials: EmailCredentials;
  emptyEmail:       boolean;
  emptyPassword:    boolean;
  invalidResponse : boolean;

  constructor(private userService: UserService) {
    this.emailCredentials = new EmailCredentials("", "");
    this.emptyEmail = false;
    this.emptyPassword = false;
    this.invalidResponse = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.focus();
    }
  }

  signIn(): void {
    this.invalidResponse = false;
    this.emptyEmail = (this.emailCredentials.userEmail.length === 0);
    this.emptyPassword = (this.emailCredentials.userPassword.length === 0);

    if (!this.emptyEmail && !this.emptyPassword) {
      this.userService.signIn(this.emailCredentials).subscribe(userToken => this.onValidResponse(), error => this.onInvalidResponse(error));
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
  }

  onInvalidResponse(error): void {
    this.invalidResponse = true;
  }

  getPasswordLostUrl(): string {
    return '/password-lost';
  }

}
