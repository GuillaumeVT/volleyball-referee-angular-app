import { Rules } from '../model/rules';
import { CrudType } from '../model/crudtype';
import { UserService } from '../user.service';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRulesModalComponent } from '../user-rules-modal/user-rules-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.css']
})
export class UserRulesComponent implements OnInit {

  signedIn:  boolean;
  rulesList: Rules[];

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private modalService: NgbModal, private toastr: ToastrService) {
    this.signedIn = false;
    this.rulesList = [];
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.signedIn = (user != null);

      if (this.signedIn) {
        this.refreshRules();
      } else {
        this.router.navigateByUrl('user');
      }
    });
  }

  refreshRules(): void {
    this.userService.getRules().subscribe(rules => this.rulesList = rules, error => this.rulesList = []);
  }

  createRules(): void {
    const rules = new Rules();
    rules.userId = this.userService.getUserId();
    rules.name = '';
    rules.date = new Date().getTime();
    rules.setsPerGame = 5;
    rules.pointsPerSet = 25;
    rules.tieBreakInLastSet = true;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.teamTimeouts = true;
    rules.teamTimeoutsPerSet = 2;
    rules.teamTimeoutDuration = 30;
    rules.technicalTimeouts = true;
    rules.technicalTimeoutDuration = 60;
    rules.gameIntervals = true;
    rules.gameIntervalDuration = 180;
    rules.teamSubstitutionsPerSet = 6;
    rules.changeSidesBeach = true;
    rules.changeSidesPeriod = 7;
    rules.changeSidesPeriodTieBreak = 5;
    rules.customConsecutiveServesPerPlayer = 9999;

    const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.rulesUpdated.subscribe(updated => this.onRulesCreated());
  }

  viewRules(rules: Rules): void {
    const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.crudType = CrudType.View;
  }

  updateRules(rules: Rules): void {
    const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.crudType = CrudType.Update;
    modalRef.componentInstance.rulesUpdated.subscribe(updated => this.onRulesUpdated());
  }

  deleteRules(rules: Rules): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete rules';
    modalRef.componentInstance.message = `Do you want to delete the rules named ${rules.name}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.userService.deleteRules(rules.name).subscribe(deleted => this.onRulesDeleted(), error => this.onRulesNotDeleted()));
  }

  onRulesCreated(): void {
    this.refreshRules();
    this.toastr.success('Rules were successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRulesUpdated(): void {
    this.refreshRules();
    this.toastr.success('Rules were successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRulesDeleted(): void {
    this.refreshRules();
    this.toastr.success('Rules were successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRulesNotDeleted(): void {
    this.toastr.error('Rules could not be deleted. Are they used in a scheduled game?', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

}
