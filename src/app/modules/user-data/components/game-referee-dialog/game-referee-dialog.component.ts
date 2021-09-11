import { Friend, UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { GameSummary } from 'src/app/shared/models/game.model';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game-referee-dialog',
  templateUrl: './game-referee-dialog.component.html',
  styleUrls: ['./game-referee-dialog.component.scss']
})
export class GameRefereeDialogComponent {

  refereeFormGroup: FormGroup;
  referee: FormControl;

  me: Friend;
  friends: Friend[];

  constructor(public dialogRef: MatDialogRef<GameRefereeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UserGameRefereeDialogData,
  private gameService: GameService, private userService: UserService, private snackBarService: SnackBarService, private translate: TranslateService) { 
    
    this.referee = new FormControl(null, [Validators.required]);
    this.refereeFormGroup = new FormGroup({referee: this.referee});

    this.me = new Friend(this.data.user.id, this.data.user.pseudo);

    this.userService.listFriendsAndRequests().subscribe(
      friendsAndRequests => {
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
      _error => {
        this.friends = [];
        this.referee.setValue(this.me);
      });
  }

  get refereeFormControl() { return this.refereeFormGroup.get('referee'); }

  onUpdateReferee(): void {
    this.gameService.updateReferee(this.data.game.id, this.refereeFormControl.value.id).subscribe(success => this.onValidResponse(), error => this.onInvalidResponse());
  }

  onValidResponse(): void {
    this.dialogRef.close(true);
  }

  onInvalidResponse(): void {
    this.translate.get('user.referee.messages.referee-update-error').subscribe(
      t =>  this.snackBarService.showError(t)
    );
  }

  close(): void {
    this.dialogRef.close(false);
  }
}

export interface UserGameRefereeDialogData {
  game: GameSummary;
  user: UserSummary;
}