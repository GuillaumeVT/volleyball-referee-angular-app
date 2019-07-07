import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.css']
})
export class PasswordLostComponent implements OnInit, AfterViewInit {

  userEmail:       string;
  emptyEmail:      boolean;
  invalidResponse: boolean;
  resetInitiated:  boolean;

  constructor(private userService: UserService) {
    this.userEmail = "";
    this.emptyEmail = false;
    this.invalidResponse = false;
    this.resetInitiated = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.focus();
    }
  }

  initiatePasswordReset(): void {
    this.invalidResponse = false;
    this.emptyEmail = (this.userEmail.length === 0);

    if (!this.emptyEmail) {
      this.userService.initiatePasswordReset(this.userEmail).subscribe(success => this.onValidResponse(), error => this.onInvalidResponse(error));
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.resetInitiated = true;
  }

  onInvalidResponse(error): void {
    this.invalidResponse = true;
  }

}
