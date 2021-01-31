import { UserService } from 'src/app/core/services/user.service';

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.css']
})
export class PasswordLostComponent implements AfterViewInit {

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

  onInvalidResponse(_error: any): void {
    this.invalidResponse = true;
  }

}
