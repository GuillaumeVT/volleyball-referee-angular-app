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

  selectedSubstitutionsLimitation: number;

  invalidName:     boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.invalidName = false;
    this.invalidResponse =  false;
    this.selectedSubstitutionsLimitation = 1;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.rules && this.crudType) {
      this.initForm();
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    (<HTMLInputElement>document.getElementById('name')).value = this.rules.name;
    (<HTMLInputElement>document.getElementById('sets-per-game')).value = String(this.rules.setsPerGame);
    (<HTMLInputElement>document.getElementById('points-per-set')).value = String(this.rules.pointsPerSet);
    (<HTMLInputElement>document.getElementById('tie-break')).checked = this.rules.tieBreakInLastSet;
    (<HTMLInputElement>document.getElementById('points-in-tie-break')).value = String(this.rules.pointsInTieBreak);
    (<HTMLInputElement>document.getElementById('two-points')).checked = this.rules.twoPointsDifference;
    (<HTMLInputElement>document.getElementById('sanctions')).checked = this.rules.sanctions;
    (<HTMLInputElement>document.getElementById('team-timeouts')).checked = this.rules.teamTimeouts;
    (<HTMLInputElement>document.getElementById('team-timeouts-number')).value = String(this.rules.teamTimeoutsPerSet);
    (<HTMLInputElement>document.getElementById('team-timeouts-duration')).value = String(this.rules.teamTimeoutDuration);
    (<HTMLInputElement>document.getElementById('technical-timeouts')).checked = this.rules.technicalTimeouts;
    (<HTMLInputElement>document.getElementById('technical-timeouts-duration')).value = String(this.rules.technicalTimeoutDuration);
    (<HTMLInputElement>document.getElementById('game-intervals')).checked = this.rules.gameIntervals;
    (<HTMLInputElement>document.getElementById('game-intervals-duration')).value = String(this.rules.gameIntervalDuration);
    (<HTMLInputElement>document.getElementById('substitutions-limitation')).value = String(this.rules.substitutionsLimitation);
    (<HTMLInputElement>document.getElementById('substitutions-number')).value = String(this.rules.teamSubstitutionsPerSet);
    (<HTMLInputElement>document.getElementById('beach-court-switches')).checked = this.rules.beachCourtSwitches;
    (<HTMLInputElement>document.getElementById('beach-switch-court-frequency')).value = String(this.rules.beachCourtSwitchFreq);
    (<HTMLInputElement>document.getElementById('beach-switch-court-frequency-tie-break')).value = String(this.rules.beachCourtSwitchFreqTieBreak);
    (<HTMLInputElement>document.getElementById('consecutive-serves')).value = String(this.rules.customConsecutiveServesPerPlayer);

    this.onTeamTimeoutsChanged();
    this.onTechnicalTimeoutsChanged();
    this.onGameIntervalsChanged();
    setTimeout(() => this.checkSubstitutions(), 0);
  }

  onSubmitForm(): void {
    const name = (<HTMLInputElement>document.getElementById('name')).value;

    if (name.length === 0) {
      this.invalidName = true;
    } else {
      this.invalidName = false;

      this.rules.name = (<HTMLInputElement>document.getElementById('name')).value;
      this.rules.date = new Date().getTime();
      this.rules.setsPerGame = Number((<HTMLInputElement>document.getElementById('sets-per-game')).value);
      this.rules.pointsPerSet = Number((<HTMLInputElement>document.getElementById('points-per-set')).value);
      this.rules.tieBreakInLastSet = (<HTMLInputElement>document.getElementById('tie-break')).checked;
      this.rules.pointsInTieBreak = Number((<HTMLInputElement>document.getElementById('points-in-tie-break')).value);
      this.rules.twoPointsDifference = (<HTMLInputElement>document.getElementById('two-points')).checked;
      this.rules.sanctions = (<HTMLInputElement>document.getElementById('sanctions')).checked;
      this.rules.teamTimeouts = (<HTMLInputElement>document.getElementById('team-timeouts')).checked;
      this.rules.teamTimeoutsPerSet = Number((<HTMLInputElement>document.getElementById('team-timeouts-number')).value);
      this.rules.teamTimeoutDuration = Number((<HTMLInputElement>document.getElementById('team-timeouts-duration')).value);
      this.rules.technicalTimeouts = (<HTMLInputElement>document.getElementById('technical-timeouts')).checked;
      this.rules.technicalTimeoutDuration = Number((<HTMLInputElement>document.getElementById('technical-timeouts-duration')).value);
      this.rules.gameIntervals = (<HTMLInputElement>document.getElementById('game-intervals')).checked;
      this.rules.gameIntervalDuration = Number((<HTMLInputElement>document.getElementById('game-intervals-duration')).value);
      this.rules.substitutionsLimitation = Number((<HTMLInputElement>document.getElementById('substitutions-limitation')).value);
      this.rules.teamSubstitutionsPerSet = Number((<HTMLInputElement>document.getElementById('substitutions-number')).value);
      this.rules.beachCourtSwitches = (<HTMLInputElement>document.getElementById('beach-court-switches')).checked;
      this.rules.beachCourtSwitchFreq = Number((<HTMLInputElement>document.getElementById('beach-switch-court-frequency')).value);
      this.rules.beachCourtSwitchFreqTieBreak = Number((<HTMLInputElement>document.getElementById('beach-switch-court-frequency-tie-break')).value);
      this.rules.customConsecutiveServesPerPlayer = Number((<HTMLInputElement>document.getElementById('consecutive-serves')).value);

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

  onTieBreakChanged(): void {
    const checked: boolean = (<HTMLInputElement>document.getElementById('tie-break')).checked;

    if (this.crudType === 1 || this.crudType === 2) {
      const disabled = checked ? null : true;
      (<HTMLInputElement>document.getElementById('points-in-tie-break')).disabled = disabled;
    }
  }

  onTeamTimeoutsChanged(): void {
    const checked: boolean = (<HTMLInputElement>document.getElementById('team-timeouts')).checked;

    if (this.crudType === 1 || this.crudType === 2) {
      const disabled = checked ? null : true;
      (<HTMLInputElement>document.getElementById('team-timeouts-number')).disabled = disabled;
      (<HTMLInputElement>document.getElementById('team-timeouts-duration')).disabled = disabled;
    }
  }

  onTechnicalTimeoutsChanged(): void {
    const checked: boolean = (<HTMLInputElement>document.getElementById('technical-timeouts')).checked;

    if (this.crudType === 1 || this.crudType === 2) {
      const disabled = checked ? null : true;
      (<HTMLInputElement>document.getElementById('technical-timeouts-duration')).disabled = disabled;
    }
  }

  onGameIntervalsChanged(): void {
    const checked: boolean = (<HTMLInputElement>document.getElementById('game-intervals')).checked;

    if (this.crudType === 1 || this.crudType === 2) {
      const disabled = checked ? null : true;
      (<HTMLInputElement>document.getElementById('game-intervals-duration')).disabled = disabled;
    }
  }

  onBeachCourtSwitchesChanged(): void {
    const checked: boolean = (<HTMLInputElement>document.getElementById('beach-court-switches')).checked;

    if (this.crudType === 1 || this.crudType === 2) {
      const disabled = checked ? null : true;
      (<HTMLInputElement>document.getElementById('beach-switch-court-frequency')).disabled = disabled;
      (<HTMLInputElement>document.getElementById('beach-switch-court-frequency-tie-break')).disabled = disabled;
    }
  }

  checkSubstitutions(): void {
    var substitutionsLimitation: number = Number((<HTMLInputElement>document.getElementById('substitutions-limitation')).value);
    var teamSubstitutionsPerSet: number = Number((<HTMLInputElement>document.getElementById('substitutions-number')).value);

    this.selectedSubstitutionsLimitation = substitutionsLimitation;

    if (substitutionsLimitation === 1 && teamSubstitutionsPerSet > 12) {
      teamSubstitutionsPerSet = 12;
      (<HTMLInputElement>document.getElementById('substitutions-number')).value = String(teamSubstitutionsPerSet);
    }
  }

}
