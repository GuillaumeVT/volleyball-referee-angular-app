import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Friend, UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { GameSummary } from '@shared/models/game.model';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { GameService } from '@user-data/services/game.service';

@Component({
  selector: 'app-game-referee-dialog',
  templateUrl: './game-referee-dialog.component.html',
  styleUrls: ['./game-referee-dialog.component.scss'],
})
export class GameRefereeDialogComponent {
  public refereeFormGroup: UntypedFormGroup;
  public referee: UntypedFormControl;

  public me: Friend;
  public friends: Friend[];

  constructor(
    private _dialogRef: MatDialogRef<GameRefereeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGameRefereeDialogData,
    private _gameService: GameService,
    private _userService: UserService,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    this.referee = new UntypedFormControl(null, [Validators.required]);
    this.refereeFormGroup = new UntypedFormGroup({ referee: this.referee });

    this.me = new Friend(this.data.user.id, this.data.user.pseudo);

    this._userService.listFriendsAndRequests().subscribe({
      next: (friendsAndRequests) => {
        this.friends = friendsAndRequests.friends;

        if (this.data.game.refereedBy === this.me.id) {
          this.referee.setValue(this.me);
        } else {
          for (let friend of this.friends) {
            if (this.data.game.refereedBy === friend.id) {
              this.referee.setValue(friend);
            }
          }
        }
      },
      error: (_) => {
        this.friends = [];
        this.referee.setValue(this.me);
      },
    });
  }

  get refereeFormControl() {
    return this.refereeFormGroup.get('referee');
  }

  public onUpdateReferee(): void {
    this._gameService.updateReferee(this.data.game.id, this.refereeFormControl.value.id).subscribe({
      next: (success) => this.onValidResponse(),
      error: (_) => this.onInvalidResponse(),
    });
  }

  private onValidResponse(): void {
    this._dialogRef.close(true);
  }

  private onInvalidResponse(): void {
    this._translateService.get('user.referee.messages.referee-update-error').subscribe((t) => this._snackBarService.showError(t));
  }

  public close(): void {
    this._dialogRef.close(false);
  }
}

export interface UserGameRefereeDialogData {
  game: GameSummary;
  user: UserSummary;
}
