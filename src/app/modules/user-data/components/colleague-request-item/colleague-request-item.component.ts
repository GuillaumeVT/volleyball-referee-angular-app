import { FriendRequest } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-colleague-request-item',
  templateUrl: './colleague-request-item.component.html',
  styleUrls: ['./colleague-request-item.component.css']
})
export class ColleagueRequestItemComponent {

  @Input() friendRequest: FriendRequest;
  @Output() mustRefreshFriendRequestsReceivedBy = new EventEmitter();

  constructor(private userService: UserService, private dialog: MatDialog, private snackBarService: SnackBarService) { }

  acceptColleague(friendRequest: FriendRequest): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Accept colleague', message: `Do you want to add ${friendRequest.senderPseudo} as colleague?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.userService.acceptFriendRequest(friendRequest.id).subscribe(
          _success => this.onColleagueAccepted(friendRequest.senderPseudo),
          _error => this.onColleagueAcceptanceError(friendRequest.senderPseudo)
        );
      }
    });
  }

  rejectColleague(friendRequest: FriendRequest): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Reject colleague', message: `Do you want to reject ${friendRequest.senderPseudo}'s request?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.userService.rejectFriendRequest(friendRequest.id).subscribe(
          _success => this.onColleagueRejected(friendRequest.senderPseudo),
          _error => this.onColleagueRejectionError(friendRequest.senderPseudo)
        );
      }
    });
  }

  onColleagueAccepted(pseudo: string): void {
    this.mustRefreshFriendRequestsReceivedBy.emit(true);
    this.snackBarService.showInfo(`${pseudo} was successfully added to your colleagues.`);
  }

  onColleagueAcceptanceError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo} could not be added to your colleagues.`);
  }

  onColleagueRejected(pseudo: string): void {
    this.mustRefreshFriendRequestsReceivedBy.emit(true);
    this.snackBarService.showInfo(`${pseudo}'s request was rejected.`);
  }

  onColleagueRejectionError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo}'s colleague could not be rejected.`);
  }

}
