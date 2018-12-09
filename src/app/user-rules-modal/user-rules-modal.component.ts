import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rules } from '../model/rules';
import { CrudType } from '../model/crudtype';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-rules-modal',
  templateUrl: './user-rules-modal.component.html',
  styleUrls: ['./user-rules-modal.component.css']
})
export class UserRulesModalComponent implements OnInit, AfterViewInit {

  @Input() rules:    Rules;
  @Input() crudType: CrudType;

  @Output() rulesUpdated = new EventEmitter();

  invalidName:     boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.invalidName = false;
    this.invalidResponse =  false;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.rules && this.crudType) {
      this.checkSubstitutions();
    }
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmitForm(): void {
    if (this.rules.name.length === 0) {
      this.invalidName = true;
    } else {
      this.invalidName = false;

      if (this.crudType === CrudType.Create) {
        this.userService.createRules(this.rules).subscribe(rules => this.onValidResponse(), error => this.onInvalidResponse(error));
      } else if (this.crudType === CrudType.Update) {
        this.userService.updateRules(this.rules).subscribe(rules => this.onValidResponse(), error => this.onInvalidResponse(error));
      }
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.rulesUpdated.emit(true);
    this.close();
  }

  onInvalidResponse(error): void {
    this.invalidResponse = true;
  }

  isEditingDisabled(): boolean {
    return this.crudType === 4 ? true : null;
  }

  isEditingDisabledKey(): boolean {
    return (this.crudType === 2 ||this.crudType === 4) ? true : null;
  }

  isTieBreakDisabled(): boolean {
    if (this.crudType === 1 || this.crudType === 2) {
      return this.rules.tieBreakInLastSet ? null : true;
    } else {
      return true;
    }
  }

  isTeamTimeoutsDisabled(): boolean {
    if (this.crudType === 1 || this.crudType === 2) {
      return this.rules.teamTimeouts ? null : true;
    } else {
      return true;
    }
  }

  isTechnicalTimeoutsDisabled(): boolean {
    if (this.crudType === 1 || this.crudType === 2) {
      return this.rules.technicalTimeouts ? null : true;
    } else {
      return true;
    }
  }

  isGameIntervalsDisabled(): boolean {
    if (this.crudType === 1 || this.crudType === 2) {
      return this.rules.gameIntervals ? null : true;
    } else {
      return true;
    }
  }

  isBeachCourtSwitchesDisabled(): boolean {
    if (this.crudType === 1 || this.crudType === 2) {
      return this.rules.beachCourtSwitches ? null : true;
    } else {
      return true;
    }
  }

  checkSubstitutions(): void {
    setTimeout(() => {
      if (this.rules.substitutionsLimitation === 1 && this.rules.teamSubstitutionsPerSet > 12) {
        this.rules.teamSubstitutionsPerSet = 12;
      }
    }, 0);
  }

}
