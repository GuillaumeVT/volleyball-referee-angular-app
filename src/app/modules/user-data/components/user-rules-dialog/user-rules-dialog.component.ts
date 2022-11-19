import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  ) {
    this.editingDisabled = this.data.crudType === CrudType.View ? true : false;

    this.createOptions();

    this.setsPerGame = new UntypedFormControl({ value: this.data.rules.setsPerGame, disabled: this.editingDisabled }, [Validators.required]);
    this.pointsPerSet = new UntypedFormControl({ value: this.data.rules.pointsPerSet, disabled: this.editingDisabled }, [Validators.required]);
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
    this.technicalTimeoutDuration = new UntypedFormControl({ value: this.data.rules.technicalTimeoutDuration, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
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
    this.substitutionsLimitation = new UntypedFormControl({ value: this.data.rules.substitutionsLimitation, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
    this.teamSubstitutionsPerSet = new UntypedFormControl({ value: this.data.rules.teamSubstitutionsPerSet, disabled: this.editingDisabled }, [
      Validators.required,
    ]);
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
    this.setsPerGameOptions = [
      { value: 5, label: 'Game of 5 sets' },
      { value: 4, label: 'Game of 4 sets' },
      { value: 3, label: 'Game of 3 sets' },
      { value: 2, label: 'Game of 2 sets' },
      { value: 1, label: 'Game of 1 set' },
    ];

    for (let index = 40; index >= 9; index--) {
      this.pointsPerSetOptions.push({ value: index, label: `Set of ${index} points` });
    }

    for (let index = 40; index >= 9; index--) {
      this.pointsInTieBreakOptions.push({ value: index, label: `Tie break of ${index} points` });
    }

    this.matchTerminationOptions = [
      { value: 1, label: 'Finish the match when a team wins' },
      { value: 2, label: 'Finish the match when all the sets have been played' },
    ];

    this.teamTimeoutsPerSetOptions = [
      { value: 3, label: '3 team timeouts per set' },
      { value: 2, label: '2 team timeouts per set' },
      { value: 1, label: '1 team timeout per set' },
      { value: 0, label: 'No team timeout per set' },
    ];

    for (let durations of [60, 45, 30]) {
      this.timeoutDurationOptions.push({ value: durations, label: `${durations} seconds` });
    }

    this.gameIntervalDurationOptions = [
      { value: 180, label: '3 minutes' },
      { value: 120, label: '2 minutes' },
      { value: 60, label: '1 minute' },
    ];

    for (let index = 10; index >= 5; index--) {
      this.beachCourtSwitchOptions.push({ value: index, label: `Switch court every ${index} points` });
    }

    this.customConsecutiveServesPerPlayerOptions = [
      { value: 9999, label: 'Unlimited' },
      { value: 5, label: '5 serves' },
      { value: 4, label: '4 serves' },
      { value: 3, label: '3 serves' },
      { value: 2, label: '2 serves' },
    ];

    this.substitutionsLimitationOptions = [
      { value: 1, label: 'FIVB limitation' },
      { value: 2, label: 'Alternative limitation 1' },
      { value: 3, label: 'Alternative limitation 2' },
      { value: 4, label: 'No limitation' },
    ];

    for (let substitions of [18, 15, 12, 6, 5, 4, 3, 2]) {
      this.teamSubstitutionsPerSetOptions.push({ value: substitions, label: `${substitions} substitutions per set` });
    }

    this.teamSubstitutionsPerSetOptions[0].label += ' (according to substitutions limitation)';
    this.teamSubstitutionsPerSetOptions[1].label += ' (according to substitutions limitation)';
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
      this.snackBarService.showError(`The rules ${this.nameFormControl.value} could not be created. Is the name already used?`);
    } else if (this.data.crudType === CrudType.Update) {
      this.snackBarService.showError(`The rules ${this.nameFormControl.value} could not be updated. Is the name already used?`);
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
