import { Friend, UserSummary } from 'src/app/core/models/user.model';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { LeagueService } from 'src/app/modules/user-data/services/league.service';
import { GameIngredients, GameSummary } from 'src/app/shared/models/game.model';
import { League } from 'src/app/shared/models/league.model';
import { Rules } from 'src/app/shared/models/rules.model';
import { Team } from 'src/app/shared/models/team.model';
import { GenderPipe } from 'src/app/shared/pipes/gender.pipe';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-game-dialog',
  templateUrl: './user-game-dialog.component.html',
  styleUrls: ['./user-game-dialog.component.scss'],
})
export class UserGameDialogComponent {
  crudTypeEnum: typeof CrudType = CrudType;

  gameFormGroup: FormGroup;
  referee: FormControl;
  genderPipe: GenderPipe;

  me: Friend;
  scheduleDate: Date;
  minScheduleDate: Date;
  divisionsOfSelectedLeague: string[];

  genderTranslations: any;

  constructor(
    public dialogRef: MatDialogRef<UserGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGameDialogData,
    private gameService: GameService,
    private leagueService: LeagueService,
    private snackBarService: SnackBarService,
    public datePipe: DatePipe,
    private translate: TranslateService,
  ) {
    this.genderPipe = new GenderPipe();
    const editingDisabled = this.data.crudType === CrudType.View ? true : false;
    this.scheduleDate = new Date(this.data.game.scheduledAt);
    this.minScheduleDate = new Date();
    this.divisionsOfSelectedLeague = [];

    this.translate
      .get(['user.team.mixed-pipe', 'user.team.ladies-pipe', 'user.team.gents-pipe'])
      .subscribe((t) => (this.genderTranslations = t));

    this.referee = new FormControl({ value: null, disabled: editingDisabled }, [Validators.required]);

    this.gameFormGroup = new FormGroup(
      {
        scheduledAt: new FormControl({ value: this.scheduleDate, disabled: editingDisabled }),
        indexed: new FormControl({ value: this.data.game.indexed, disabled: editingDisabled }),
        league: new FormControl({ value: null, disabled: editingDisabled }),
        division: new FormControl({ value: this.data.game.divisionName, disabled: editingDisabled }),
        homeTeam: new FormControl({ value: null, disabled: editingDisabled }, [Validators.required]),
        guestTeam: new FormControl({ value: null, disabled: editingDisabled }, [Validators.required]),
        rules: new FormControl({ value: null, disabled: editingDisabled }, [Validators.required]),
        referee: this.referee,
        referee1Name: new FormControl({ value: data.game.referee1Name, disabled: editingDisabled }),
        referee2Name: new FormControl({ value: data.game.referee2Name, disabled: editingDisabled }),
        scorerName: new FormControl({ value: data.game.scorerName, disabled: editingDisabled }),
      },
      [
        this.teamsMustBeDifferentValidator,
        this.leagueMustExistValidator.bind(this),
        this.homeTeamMustExistValidator.bind(this),
        this.guestTeamMustExistValidator.bind(this),
        this.rulesMustExistValidator.bind(this),
      ],
    );

    this.leagueFormControl.valueChanges.subscribe((league) => {
      if (league) {
        this.divisionFormControl.setValidators([Validators.required]);
        this.refreshDivisionsOfSelectedLeague();
      } else {
        this.divisionFormControl.setValue(null);
        this.divisionFormControl.setValidators([]);
        this.divisionFormControl.setErrors(null);
      }
    });

    if (this.data.game.leagueId) {
      for (let league of this.data.gameIngredients.leagues) {
        if (league.id === this.data.game.leagueId) {
          this.leagueFormControl.setValue(league);
          this.refreshDivisionsOfSelectedLeague();
        }
      }
    }

    if (this.data.game.homeTeamId || this.data.game.guestTeamId) {
      for (let team of this.data.gameIngredients.teams) {
        if (team.id === this.data.game.homeTeamId) {
          this.homeTeamFormControl.setValue(team);
        } else if (team.id === this.data.game.guestTeamId) {
          this.guestTeamFormControl.setValue(team);
        }
      }
    }

    if (this.data.game.rulesId) {
      if (this.data.gameIngredients.defaultRules.id === this.data.game.rulesId) {
        this.rulesFormControl.setValue(this.data.gameIngredients.defaultRules);
      } else {
        for (let aRules of this.data.gameIngredients.rules) {
          if (aRules.id === this.data.game.rulesId) {
            this.rulesFormControl.setValue(aRules);
          }
        }
      }
    } else {
      this.rulesFormControl.setValue(this.data.gameIngredients.defaultRules);
    }

    this.me = new Friend(this.data.user.id, this.data.user.pseudo);

    if (this.data.game.refereedBy === this.me.id) {
      this.referee.setValue(this.me);
    } else {
      for (let friend of this.data.gameIngredients.friends) {
        if (this.data.game.refereedBy === friend.id) {
          this.referee.setValue(friend);
        }
      }
    }
  }

  get scheduledAtFormControl() {
    return this.gameFormGroup.get('scheduledAt');
  }
  get indexedFormControl() {
    return this.gameFormGroup.get('indexed');
  }
  get leagueFormControl() {
    return this.gameFormGroup.get('league');
  }
  get divisionFormControl() {
    return this.gameFormGroup.get('division');
  }
  get homeTeamFormControl() {
    return this.gameFormGroup.get('homeTeam');
  }
  get guestTeamFormControl() {
    return this.gameFormGroup.get('guestTeam');
  }
  get rulesFormControl() {
    return this.gameFormGroup.get('rules');
  }
  get refereeFormControl() {
    return this.gameFormGroup.get('referee');
  }
  get referee1NameFormControl() {
    return this.gameFormGroup.get('referee1Name');
  }
  get referee2NameFormControl() {
    return this.gameFormGroup.get('referee2Name');
  }
  get scorerNameFormControl() {
    return this.gameFormGroup.get('scorerName');
  }

  private leagueMustExistValidator(abstractControl: AbstractControl): { undefinedLeague: boolean } {
    if (abstractControl.get('league').value) {
      for (let league of this.data.gameIngredients.leagues) {
        if (league.id === abstractControl.get('league').value.id) {
          return null;
        }
      }
      return { undefinedLeague: true };
    } else {
      return null;
    }
  }

  private homeTeamMustExistValidator(abstractControl: AbstractControl): { undefinedHomeTeam: boolean } {
    if (abstractControl.get('homeTeam').value) {
      for (let team of this.data.gameIngredients.teams) {
        if (team.id === abstractControl.get('homeTeam').value.id) {
          return null;
        }
      }
      return { undefinedHomeTeam: true };
    } else {
      return null;
    }
  }

  private guestTeamMustExistValidator(abstractControl: AbstractControl): { undefinedGuestTeam: boolean } {
    if (abstractControl.get('guestTeam').value) {
      for (let team of this.data.gameIngredients.teams) {
        if (team.id === abstractControl.get('guestTeam').value.id) {
          return null;
        }
      }
      return { undefinedGuestTeam: true };
    } else {
      return null;
    }
  }

  private teamsMustBeDifferentValidator(abstractControl: AbstractControl): { sameTeams: boolean } {
    if (
      abstractControl.get('homeTeam').value &&
      abstractControl.get('guestTeam').value &&
      abstractControl.get('homeTeam').value.id === abstractControl.get('guestTeam').value.id
    ) {
      return { sameTeams: true };
    } else {
      return null;
    }
  }

  private rulesMustExistValidator(abstractControl: AbstractControl): { undefinedRules: boolean } {
    if (abstractControl.get('rules').value) {
      if (this.data.gameIngredients.defaultRules.id === abstractControl.get('rules').value.id) {
        return null;
      } else {
        for (let aRules of this.data.gameIngredients.rules) {
          if (aRules.id === abstractControl.get('rules').value.id) {
            return null;
          }
        }
      }
      return { undefinedRules: true };
    } else {
      return null;
    }
  }

  displayLeague = (league: League) => {
    return league ? league.name : null;
  };

  displayTeam = (team: Team) => {
    return team ? `${team.name}  ${this.genderTranslations[this.genderPipe.transform(team.gender)]}` : null;
  };

  displayRules = (rules: Rules) => {
    return rules ? rules.name : null;
  };

  refreshDivisionsOfSelectedLeague(): void {
    if (this.leagueFormControl.value) {
      this.leagueService.getLeague(this.leagueFormControl.value.id).subscribe(
        (league) => (this.divisionsOfSelectedLeague = league.divisions),
        (_error) => (this.divisionsOfSelectedLeague = []),
      );
    } else {
      this.divisionsOfSelectedLeague = [];
    }
  }

  onSubmitForm(): void {
    const game: GameSummary = this.data.game;
    game.scheduledAt = this.scheduledAtFormControl.value.getTime();

    game.gender =
      this.homeTeamFormControl.value.gender === this.guestTeamFormControl.value.gender ? this.homeTeamFormControl.value.gender : 'MIXED';
    game.indexed = this.indexedFormControl.value;

    game.homeTeamId = this.homeTeamFormControl.value.id;
    game.homeTeamName = this.homeTeamFormControl.value.name;
    game.guestTeamId = this.guestTeamFormControl.value.id;
    game.guestTeamName = this.guestTeamFormControl.value.name;

    game.rulesId = this.rulesFormControl.value.id;
    game.rulesName = this.rulesFormControl.value.name;

    if (this.leagueFormControl.value) {
      game.leagueId = this.leagueFormControl.value.id;
      game.leagueName = this.leagueFormControl.value.name;
      game.divisionName = this.divisionFormControl.value;
    }

    game.refereedBy = this.refereeFormControl.value.id;
    game.refereeName = this.refereeFormControl.value.pseudo;
    game.referee1Name = this.referee1NameFormControl.value;
    game.referee2Name = this.referee2NameFormControl.value;
    game.scorerName = this.scorerNameFormControl.value;

    if (this.data.crudType === CrudType.Create) {
      this.gameService.createGame(game).subscribe(
        (_game) => this.onValidResponse(),
        (_error) => this.onInvalidResponse(),
      );
    } else if (this.data.crudType === CrudType.Update) {
      this.gameService.updateGame(game).subscribe(
        (_game) => this.onValidResponse(),
        (_error) => this.onInvalidResponse(),
      );
    }
  }

  onValidResponse(): void {
    this.dialogRef.close(true);
  }

  onInvalidResponse(): void {
    if (this.data.crudType === CrudType.Create) {
      this.translate.get('user.game.messages.game-creation-error').subscribe((t) => this.snackBarService.showError(t));
    } else if (this.data.crudType === CrudType.Update) {
      this.translate.get('user.game.messages.game-update-error').subscribe((t) => this.snackBarService.showError(t));
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }
}

export interface UserGameDialogData {
  crudType: CrudType;
  game: GameSummary;
  gameIngredients: GameIngredients;
  user: UserSummary;
}
