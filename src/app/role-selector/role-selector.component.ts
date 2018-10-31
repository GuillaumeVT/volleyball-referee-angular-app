import { Component, OnInit, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocialUser } from '../login/entities/user';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent implements OnInit {

  showSelector: boolean;
  refereeRole:  boolean;
  @Output() currentRateUpdated = new EventEmitter();

  constructor(private authService: AuthService) {
    this.showSelector = false;
    this.refereeRole = false;
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.showSelector = true;
      }
      this.updateRate();
    });
  }

  ngAfterViewChecked() {
    this.activateSelectedButton();
  }

  onSetRole(refereeRole: boolean): void {
    this.refereeRole = refereeRole;
    this.updateRate();
  }

  updateRate(): void {
    if (this.refereeRole) {
      this.currentRateUpdated.emit(10000);
    } else {
      this.currentRateUpdated.emit(60000);
    }
  }

  activateSelectedButton(): void {
    var publicButton = document.getElementById("public-role");
    var refereeButton = document.getElementById("referee-role");
    if (publicButton && refereeButton) {
      publicButton.classList.remove("active");
      refereeButton.classList.remove("active");
      if (this.refereeRole) {
        refereeButton.classList.add("active");
      } else {
        publicButton.classList.add("active");
      }
    }
  }

}
