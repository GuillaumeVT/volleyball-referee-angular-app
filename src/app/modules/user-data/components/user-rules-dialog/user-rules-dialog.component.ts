import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Rules } from '@shared/models/rules.model';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { CrudType } from '@user-data/models/crud-type.model';
import { RulesService } from '@user-data/services/rules.service';

@Component({
  selector: 'app-user-rules-dialog',
  templateUrl: './user-rules-dialog.component.html',
  styleUrls: ['./user-rules-dialog.component.scss'],
})
export class UserRulesDialogComponent {
  crudTypeEnum: typeof CrudType = CrudType;

  editingDisabled: boolean;
  rulesFormGroup: UntypedFormGroup;
  setsPerGame: UntypedFormControl;
  pointsPerSet: UntypedFormControl;
  pointsInTieBreak: UntypedFormControl;
  matchTermination: UntypedFormControl;
  teamTimeoutsPerSet: UntypedFormControl;
  teamTimeoutDuration: UntypedFormControl;
  technicalTimeoutDuration: UntypedFormControl;
  gameIntervalDuration: UntypedFormControl;
  beachCourtSwitchFreq: UntypedFormControl;
  beachCourtSwitchFreqTieBreak: UntypedFormControl;
  substitutionsLimitation: UntypedFormControl;
  teamSubstitutionsPerSet: UntypedFormControl;
  customConsecutiveServesPerPlayer: UntypedFormControl;

  setsPerGameOptions: RulesOption[] = [];
  pointsPerSetOptions: RulesOption[] = [];
  pointsInTieBreakOptions: RulesOption[] = [];
  matchTerminationOptions: RulesOption[] = [];
  teamTimeoutsPerSetOptions: RulesOption[] = [];
  timeoutDurationOptions: RulesOption[] = [];
  gameIntervalDurationOptions: RulesOption[] = [];
  beachCourtSwitchOptions: RulesOption[] = [];
  customConsecutiveServesPerPlayerOptions: RulesOption[] = [];
  substitutionsLimitationOptions: RulesOption[] = [];
  teamSubstitutionsPerSetOptions: RulesOption[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserRulesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserRulesDialogData,
    private rulesService: RulesService,
    private snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    this.editingDisabled = this.data.crudType === CrudType.View ? true : false;

    this.createOptions();

    this.setsPerGame = new UntypedFormControl({ value: this.data.rules.setsPerGame, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.pointsPerSet = new UntypedFormControl({ value: this.data.rules.pointsPerSet, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.pointsInTieBreak = new UntypedFormControl({ value: this.data.rules.pointsInTieBreak, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.matchTermination = new UntypedFormControl({ value: this.data.rules.matchTermination, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.teamTimeoutsPerSet = new UntypedFormControl({ value: this.data.rules.teamTimeoutsPerSet, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.teamTimeoutDuration = new UntypedFormControl({ value: this.data.rules.teamTimeoutDuration, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.technicalTimeoutDuration = new UntypedFormControl(
      { value: this.data.rules.technicalTimeoutDuration, disabled: this.editingDisabled },
      [Validators.required],
    );
    this.gameIntervalDuration = new UntypedFormControl({ value: this.data.rules.gameIntervalDuration, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.beachCourtSwitchFreq = new UntypedFormControl({ value: this.data.rules.beachCourtSwitchFreq, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.beachCourtSwitchFreqTieBreak = new UntypedFormControl(
      { value: this.data.rules.beachCourtSwitchFreqTieBreak, disabled: this.editingDisabled },
      [Validators.required],
    );
    this.substitutionsLimitation = new UntypedFormControl(
      { value: this.data.rules.substitutionsLimitation, disabled: this.editingDisabled },
      [Validators.required],
    );
    this.teamSubstitutionsPerSet = new UntypedFormControl(
      { value: this.data.rules.teamSubstitutionsPerSet, disabled: this.editingDisabled },
      [Validators.required],
    );
    this.customConsecutiveServesPerPlayer = new UntypedFormControl(
      { value: this.data.rules.customConsecutiveServesPerPlayer, disabled: this.editingDisabled },
      [Validators.required],
    );

    this.rulesFormGroup = new UntypedFormGroup({
      name: new UntypedFormControl({ value: this.data.rules.name, disabled: this.editingDisabled }, [Validators.required]),
      setsPerGame: this.setsPerGame,
      pointsPerSet: this.pointsPerSet,
      tieBreakInLastSet: new UntypedFormControl({ value: this.data.rules.tieBreakInLastSet, disabled: this.editingDisabled }),
      pointsInTieBreak: this.pointsInTieBreak,
      twoPointsDifference: new UntypedFormControl({ value: this.data.rules.twoPointsDifference, disabled: this.editingDisabled }),
      sanctions: new UntypedFormControl({ value: this.data.rules.sanctions, disabled: this.editingDisabled }),
      matchTermination: this.matchTermination,
      teamTimeouts: new UntypedFormControl({ value: this.data.rules.teamTimeouts, disabled: this.editingDisabled }),
      technicalTimeouts: new UntypedFormControl({ value: this.data.rules.technicalTimeouts, disabled: this.editingDisabled }),
      gameIntervals: new UntypedFormControl({ value: this.data.rules.gameIntervals, disabled: this.editingDisabled }),
      teamTimeoutsPerSet: this.teamTimeoutsPerSet,
      teamTimeoutDuration: this.teamTimeoutDuration,
      technicalTimeoutDuration: this.technicalTimeoutDuration,
      gameIntervalDuration: this.gameIntervalDuration,
      beachCourtSwitches: new UntypedFormControl({ value: this.data.rules.beachCourtSwitches, disabled: this.editingDisabled }),
      beachCourtSwitchFreq: this.beachCourtSwitchFreq,
      beachCourtSwitchFreqTieBreak: this.beachCourtSwitchFreqTieBreak,
      substitutionsLimitation: this.substitutionsLimitation,
      teamSubstitutionsPerSet: this.teamSubstitutionsPerSet,
      customConsecutiveServesPerPlayer: this.customConsecutiveServesPerPlayer,
    });

    this.substitutionsLimitation.valueChanges.subscribe((limitation) => {
      if (limitation === 1 && this.teamSubstitutionsPerSet.value > 12) {
        this.teamSubstitutionsPerSet.setValue(6);
      }
    });

    this.setsPerGame.valueChanges.subscribe((setsPerGame) => {
      if (setsPerGame % 2 === 0) {
        this.matchTermination.setValue(2);
      }
    });

    this.matchTermination.valueChanges.subscribe((_) => {
      if (this.setsPerGame.value % 2 === 0) {
        this.matchTermination.setValue(2);
      }
    });
  }

  get nameFormControl() {
    return this.rulesFormGroup.get('name');
  }
  get tieBreakInLastSetFormControl() {
    return this.rulesFormGroup.get('tieBreakInLastSet');
  }
  get twoPointsDifferenceFormControl() {
    return this.rulesFormGroup.get('twoPointsDifference');
  }
  get sanctionsFormControl() {
    return this.rulesFormGroup.get('sanctions');
  }
  get teamTimeoutsFormControl() {
    return this.rulesFormGroup.get('teamTimeouts');
  }
  get technicalTimeoutsFormControl() {
    return this.rulesFormGroup.get('technicalTimeouts');
  }
  get gameIntervalsFormControl() {
    return this.rulesFormGroup.get('gameIntervals');
  }
  get beachCourtSwitchesFormControl() {
    return this.rulesFormGroup.get('beachCourtSwitches');
  }

  private createOptions(): void {
    this._translateService.get('user.rules.sets-per-game-options').subscribe((t) => {
      for (let index = 5; index >= 1; index--) {
        this.setsPerGameOptions.push({ value: index, label: t[`${index}`] });
      }
    });

    for (let points = 40; points >= 9; points--) {
      this.pointsPerSetOptions.push({
        value: points,
        label: this._translateService.instant('user.rules.points-per-set-options', { points: points }),
      });
    }

    for (let points = 40; points >= 9; points--) {
      this.pointsInTieBreakOptions.push({
        value: points,
        label: this._translateService.instant('user.rules.points-per-tie-break-options', { points: points }),
      });
    }

    this._translateService.get('user.rules.match-termination-options').subscribe((t) => {
      this.matchTerminationOptions = [
        { value: 1, label: t['normal'] },
        { value: 2, label: t['play-all'] },
      ];
    });

    this._translateService.get('user.rules.team-timeouts-per-set-options').subscribe((t) => {
      for (let timeouts = 3; timeouts >= 0; timeouts--) {
        this.teamTimeoutsPerSetOptions.push({ value: timeouts, label: t[`${timeouts}`] });
      }
    });

    for (let duration of [60, 45, 30]) {
      this.timeoutDurationOptions.push({
        value: duration,
        label: this._translateService.instant('user.rules.timeouts-duration-options', { seconds: duration }),
      });
    }

    this._translateService.get('user.rules.game-interval-duration-options').subscribe((t) => {
      for (let interval of [180, 120, 60]) {
        this.gameIntervalDurationOptions.push({ value: interval, label: t[`${interval}`] });
      }
    });

    for (let points = 10; points >= 5; points--) {
      this.beachCourtSwitchOptions.push({
        value: points,
        label: this._translateService.instant('user.rules.court-switch-frequency-options', { points: points }),
      });
    }

    this._translateService.get('user.rules.consecutive-serves-per-player-options').subscribe((t) => {
      for (let serves of [9999, 5, 4, 3, 2]) {
        this.customConsecutiveServesPerPlayerOptions.push({ value: serves, label: t[`${serves}`] });
      }
    });

    this._translateService.get('user.rules.substitutions-limitation-options').subscribe((t) => {
      for (let limitation of [1, 2, 3, 4]) {
        this.substitutionsLimitationOptions.push({ value: limitation, label: t[`${limitation}`] });
      }
    });

    for (let substitutions of [18, 15, 12, 6, 5, 4, 3, 2]) {
      this.teamSubstitutionsPerSetOptions.push({
        value: substitutions,
        label: this._translateService.instant('user.rules.substitutions-per-set-options', { substitutions: substitutions }),
      });
    }

    const limitationComment = this._translateService.instant('user.rules.substitutions-limitation-options-comment');
    this.teamSubstitutionsPerSetOptions[0].label += ` ${limitationComment}`;
    this.teamSubstitutionsPerSetOptions[1].label += ` ${limitationComment}`;
  }

  onSubmitForm(): void {
    const rules: Rules = this.data.rules;

    rules.name = this.nameFormControl.value;
    rules.setsPerGame = this.setsPerGame.value;
    rules.pointsPerSet = this.pointsPerSet.value;
    rules.tieBreakInLastSet = this.tieBreakInLastSetFormControl.value;
    rules.pointsInTieBreak = this.pointsInTieBreak.value;
    rules.twoPointsDifference = this.twoPointsDifferenceFormControl.value;
    rules.sanctions = this.sanctionsFormControl.value;
    rules.matchTermination = this.matchTermination.value;
    rules.teamTimeouts = this.teamTimeoutsFormControl.value;
    rules.teamTimeoutsPerSet = this.teamTimeoutsPerSet.value;
    rules.teamTimeoutDuration = this.teamTimeoutDuration.value;
    rules.technicalTimeouts = this.technicalTimeoutsFormControl.value;
    rules.technicalTimeoutDuration = this.technicalTimeoutDuration.value;
    rules.gameIntervals = this.gameIntervalsFormControl.value;
    rules.gameIntervalDuration = this.gameIntervalDuration.value;
    rules.beachCourtSwitches = this.beachCourtSwitchesFormControl.value;
    rules.beachCourtSwitchFreq = this.beachCourtSwitchFreq.value;
    rules.beachCourtSwitchFreqTieBreak = this.beachCourtSwitchFreqTieBreak.value;
    rules.substitutionsLimitation = this.substitutionsLimitation.value;
    rules.teamSubstitutionsPerSet = this.teamSubstitutionsPerSet.value;
    rules.customConsecutiveServesPerPlayer = this.customConsecutiveServesPerPlayer.value;

    if (this.data.crudType === CrudType.Create) {
      this.rulesService.createRules(rules).subscribe({
        next: (_rules) => this.onValidResponse(),
        error: (_) => this.onInvalidResponse(),
      });
    } else if (this.data.crudType === CrudType.Update) {
      this.rulesService.updateRules(rules).subscribe({
        next: (_rules) => this.onValidResponse(),
        error: (_) => this.onInvalidResponse(),
      });
    }
  }

  onValidResponse(): void {
    this.dialogRef.close(true);
  }

  onInvalidResponse(): void {
    if (this.data.crudType === CrudType.Create) {
      this._translateService
        .get('user.rules.messages.creation-error', { name: this.nameFormControl.value })
        .subscribe((t) => this.snackBarService.showError(t));
    } else if (this.data.crudType === CrudType.Update) {
      this._translateService
        .get('user.rules.messages.update-error', { name: this.nameFormControl.value })
        .subscribe((t) => this.snackBarService.showError(t));
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  onEdit(): void {
    this.data.crudType = CrudType.Update;
    this.editingDisabled = false;
    this.rulesFormGroup.enable({ onlySelf: false, emitEvent: true });
    this.rulesFormGroup.setValue(this.rulesFormGroup.value);
  }
}

export interface UserRulesDialogData {
  crudType: CrudType;
  rules: Rules;
}

export interface RulesOption {
  label: string;
  value: any;
}
