import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Player, Team } from '@shared/models/team.model';
import { PlayerStyleService } from '@shared/services/player-style.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { ColorPickerDialogComponent } from '@user-data/components/color-picker-dialog/color-picker-dialog.component';
import { PlayerNamesDialogComponent } from '@user-data/components/player-names-dialog/player-names-dialog.component';
import { CrudType } from '@user-data/models/crud-type.model';
import { InputPlayerItem } from '@user-data/models/input-player-item.model';
import { TeamService } from '@user-data/services/team.service';

@Component({
  selector: 'app-user-team-dialog',
  templateUrl: './user-team-dialog.component.html',
  styleUrls: ['./user-team-dialog.component.scss'],
})
export class UserTeamDialogComponent {
  crudTypeEnum: typeof CrudType = CrudType;

  teamFormGroup: UntypedFormGroup;
  captain: UntypedFormControl;

  editingDisabled: boolean;
  players: InputPlayerItem[];
  liberos: InputPlayerItem[];
  moreNumbers: boolean;
  minPlayers: number;
  selectedPlayers: number[];

  constructor(
    public dialogRef: MatDialogRef<UserTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserTeamDialogData,
    private teamService: TeamService,
    public playerStyleService: PlayerStyleService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private _translate: TranslateService,
  ) {
    this.editingDisabled = this.data.crudType === CrudType.View ? true : false;
    this.moreNumbers = false;
    this.players = [];
    this.liberos = [];

    for (let index = 0; index <= 99; index++) {
      this.players.push(new InputPlayerItem(index, '#ffffff', '#000000', '#000000', false, '#1f1f1f', '#d6d7d7', '#d6d7d7'));
    }

    this.selectedPlayers = [];

    switch (this.data.team.kind) {
      case 'INDOOR':
        this.minPlayers = 6;
        break;
      case 'BEACH':
        this.minPlayers = 2;
        break;
      case 'INDOOR_4X4':
        this.minPlayers = 4;
        break;
      case 'SNOW':
        this.minPlayers = 3;
        break;
    }

    this.captain = new UntypedFormControl({ value: this.data.team.captain, disabled: this.editingDisabled }, [
      Validators.required,
      Validators.min(0),
    ]);

    this.teamFormGroup = new UntypedFormGroup({
      name: new UntypedFormControl({ value: this.data.team.name, disabled: this.editingDisabled }, [Validators.required]),
      gender: new UntypedFormControl({ value: this.data.team.gender, disabled: this.editingDisabled }, [Validators.required]),
      color: new UntypedFormControl({ value: this.data.team.color, disabled: this.editingDisabled }, [Validators.required]),
      liberoColor: new UntypedFormControl({ value: this.data.team.liberoColor, disabled: this.editingDisabled }, [Validators.required]),
      captain: this.captain,
      numberOfPlayers: new UntypedFormControl({ value: this.data.team.players.length, disabled: this.editingDisabled }, [
        Validators.min(this.minPlayers),
      ]),
      coachName: new UntypedFormControl({ value: this.data.team.coach, disabled: this.editingDisabled }),
    });

    this.onShirtColorChanged(this.colorFormControl.value);
    this.onLiberoShirtColorChanged(this.liberoColorFormControl.value);
    this.initPlayersAndLiberos();
  }

  get nameFormControl() {
    return this.teamFormGroup.get('name');
  }
  get genderFormControl() {
    return this.teamFormGroup.get('gender');
  }
  get colorFormControl() {
    return this.teamFormGroup.get('color');
  }
  get liberoColorFormControl() {
    return this.teamFormGroup.get('liberoColor');
  }
  get captainFormControl() {
    return this.teamFormGroup.get('captain');
  }
  get numberOfPlayersFormControl() {
    return this.teamFormGroup.get('numberOfPlayers');
  }
  get coachNameFormControl() {
    return this.teamFormGroup.get('coachName');
  }

  getGenderIcon(): string {
    if (this.genderFormControl.value === 'MIXED') {
      return 'fa fa-intersex';
    } else if (this.genderFormControl.value === 'LADIES') {
      return 'fa fa-venus';
    } else {
      return 'fa fa-mars';
    }
  }

  getGenderButton(): string {
    if (this.genderFormControl.value === 'MIXED') {
      return 'mixed-gender';
    } else if (this.genderFormControl.value === 'LADIES') {
      return 'ladies-gender';
    } else {
      return 'gents-gender';
    }
  }

  onNextGender(): void {
    if (this.genderFormControl.value === 'MIXED') {
      this.genderFormControl.setValue('LADIES');
    } else if (this.genderFormControl.value === 'LADIES') {
      this.genderFormControl.setValue('GENTS');
    } else {
      this.genderFormControl.setValue('MIXED');
    }
  }

  initPlayersAndLiberos(): void {
    for (let player of this.data.team.players) {
      this.onPlayerSelected(player.num, false);
    }

    for (let libero of this.data.team.liberos) {
      this.onLiberoSelected(libero.num, false);
    }
  }

  onChangeShirtColor(): void {
    const dialogRef = this.dialog.open(ColorPickerDialogComponent, { width: '800px', data: this.colorFormControl.value });
    dialogRef.afterClosed().subscribe((color: string) => {
      if (color) {
        this.onShirtColorChanged(color);
      }
    });
  }

  onShirtColorChanged(color: string): void {
    this.colorFormControl.setValue(color);
    const textColor: string = this.playerStyleService.getTextColor(color);
    const borderColor: string = this.playerStyleService.getBorderColor(color);
    for (let playerItem of this.players) {
      playerItem.backgroundColor = color;
      playerItem.color = textColor;
      playerItem.borderColor = borderColor;
    }
  }

  onChangeLiberoShirtColor(): void {
    const dialogRef = this.dialog.open(ColorPickerDialogComponent, { width: '800px', data: this.liberoColorFormControl.value });
    dialogRef.afterClosed().subscribe((color: string) => {
      if (color) {
        this.onLiberoShirtColorChanged(color);
      }
    });
  }

  onLiberoShirtColorChanged(color: string): void {
    this.liberoColorFormControl.setValue(color);
    const textColor: string = this.playerStyleService.getTextColor(color);
    const borderColor: string = this.playerStyleService.getBorderColor(color);
    for (let liberoItem of this.liberos) {
      liberoItem.backgroundColor = color;
      liberoItem.color = textColor;
      liberoItem.borderColor = borderColor;
    }
  }

  onPlayerSelected(player: number, andUpdateModel: boolean) {
    const playerItem = this.players[player];
    playerItem.selected = !playerItem.selected;

    if (playerItem.selected) {
      const liberoColor = this.liberoColorFormControl.value;
      const color: string = this.playerStyleService.getTextColor(liberoColor);
      const borderColor: string = this.playerStyleService.getBorderColor(liberoColor);
      this.liberos.push(new InputPlayerItem(player, color, liberoColor, borderColor, playerItem.captain, '#1f1f1f', '#d6d7d7', '#d6d7d7'));
      this.liberos = this.liberos.sort((l1, l2) => l1.shirtNumber - l2.shirtNumber);
      this.selectedPlayers.push(player);
      this.selectedPlayers = this.selectedPlayers.sort((a, b) => a - b);
      if (andUpdateModel) {
        this.addPlayer(player);
      }
    } else {
      var tmpLiberos = [];

      for (let liberoItem of this.liberos) {
        if (liberoItem.shirtNumber !== player) {
          tmpLiberos.push(liberoItem);
        }
      }

      this.liberos = tmpLiberos.sort((l1, l2) => l1.shirtNumber - l2.shirtNumber);

      for (var index = 0; index < this.selectedPlayers.length; index++) {
        if (this.selectedPlayers[index] === player) {
          this.selectedPlayers.splice(index, 1);
        }
      }

      if (andUpdateModel) {
        this.removePlayer(player);
      }
    }

    this.numberOfPlayersFormControl.setValue(this.selectedPlayers.length);
  }

  onLiberoSelected(player: number, andUpdateModel: boolean) {
    if (this.numberOfPlayers() > this.minPlayers) {
      const numberOfLiberos = this.numberOfLiberos();
      for (let liberoItem of this.liberos) {
        if (liberoItem.shirtNumber === player) {
          if (liberoItem.selected || numberOfLiberos < 2) {
            liberoItem.selected = !liberoItem.selected;
          }
          if (andUpdateModel) {
            if (liberoItem.selected) {
              this.addLibero(player);
            } else {
              this.removeLibero(player);
            }
          }
        }
      }
    }
  }

  numberOfPlayers(): number {
    var count = 0;
    for (let playerItem of this.players) {
      if (playerItem.selected) {
        count++;
      }
    }
    return count;
  }

  numberOfLiberos(): number {
    var count = 0;
    for (let liberoItem of this.liberos) {
      if (liberoItem.selected) {
        count++;
      }
    }
    return count;
  }

  addPlayer(player: number): void {
    this.data.team.players.push(new Player(player, ''));
  }

  removePlayer(player: number): void {
    for (var index = 0; index < this.data.team.players.length; index++) {
      if (this.data.team.players[index].num === player) {
        this.data.team.players.splice(index, 1);
      }
    }
    if (this.captainFormControl.value === player) {
      this.captainFormControl.setValue(null);
    }
    this.removeLibero(player);
  }

  addLibero(libero: number): void {
    for (let player of this.data.team.players) {
      if (player.num == libero) {
        this.data.team.liberos.push(player);
      }
    }
  }

  removeLibero(libero: number): void {
    for (var index = 0; index < this.data.team.liberos.length; index++) {
      if (this.data.team.liberos[index].num === libero) {
        this.data.team.liberos.splice(index, 1);
      }
    }
  }

  showMoreNumbers(): void {
    this.moreNumbers = true;
  }

  showLessNumbers(): void {
    this.moreNumbers = false;
  }

  onEditPlayerNames(): void {
    this.data.team.players = this.data.team.players.sort((p1, p2) => p1.num - p2.num);
    const dialogRef = this.dialog.open(PlayerNamesDialogComponent, { width: '800px', data: this.data.team });
  }

  onSubmitForm(): void {
    const team: Team = this.data.team;

    team.name = this.nameFormControl.value;
    team.gender = this.genderFormControl.value;
    team.color = this.colorFormControl.value;
    team.liberoColor = this.liberoColorFormControl.value;
    team.captain = this.captainFormControl.value;
    team.coach = this.coachNameFormControl.value;

    if (this.data.crudType === CrudType.Create) {
      this.teamService.createTeam(team).subscribe({
        next: (_team) => this.onValidResponse(),
        error: (_) => this.onInvalidResponse(),
      });
    } else if (this.data.crudType === CrudType.Update) {
      this.teamService.updateTeam(team).subscribe({
        next: (_team) => this.onValidResponse(),
        error: (_) => this.onInvalidResponse(),
      });
    }
  }

  onValidResponse(): void {
    this.dialogRef.close(true);
  }

  onInvalidResponse(): void {
    if (this.data.crudType === CrudType.Create) {
      this._translate
        .get('user.team.messages.creation-error', { name: this.nameFormControl.value })
        .subscribe((t) => this.snackBarService.showError(t));
    } else if (this.data.crudType === CrudType.Update) {
      this._translate
        .get('user.team.messages.update-error', { name: this.nameFormControl.value })
        .subscribe((t) => this.snackBarService.showError(t));
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  onEdit(): void {
    this.data.crudType = CrudType.Update;
    this.editingDisabled = false;
    this.teamFormGroup.enable({ onlySelf: false, emitEvent: true });
    this.teamFormGroup.setValue(this.teamFormGroup.value);
  }
}

export interface UserTeamDialogData {
  crudType: CrudType;
  team: Team;
}
