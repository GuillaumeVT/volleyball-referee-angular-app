import { Friend, FriendRequest, FriendsAndRequests } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserColleagueDialogComponent } from 'src/app/modules/user-data/components/user-colleague-dialog/user-colleague-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-colleagues',
  templateUrl: './user-colleagues.component.html',
  styleUrls: ['./user-colleagues.component.css']
})
export class UserColleaguesComponent implements OnInit {

  friendsAndRequests: FriendsAndRequests;

  constructor(private titleService: Title, private userService: UserService, private dialog: MatDialog, private modalService: NgbModal, private snackBarService: SnackBarService) {
    this.titleService.setTitle('VBR - My Colleagues');
  }

  ngOnInit() {
    this.refreshFriendsAndRequests();
  }

  refreshFriendsAndRequests(): void {
    this.userService.listFriendsAndRequests().subscribe(friendsAndRequests => this.friendsAndRequests = friendsAndRequests, _error => this.friendsAndRequests = null);
  }

  addColleague(): void {
    const dialogRef = this.dialog.open(UserColleagueDialogComponent, { width: "500px" });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.onAddColleagueRequested(dialogResult);
      }
    });
  }

  removeColleague(friend: Friend): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Remove colleague', message: `Do you want to remove ${friend.pseudo}?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.userService.removeFriend(friend.id).subscribe(_deleted => this.onColleagueRemoved(friend.pseudo), _error => this.onColleagueRemovalError(friend.pseudo));
      }
    });
  }

  onAddColleagueRequested(receiverPseudo: string): void {
    this.snackBarService.showInfo(`A request was successfully sent to ${receiverPseudo}.`);
  }

  onColleagueRemoved(pseudo: string): void {
    this.refreshFriendsAndRequests();
    this.snackBarService.showInfo(`${pseudo} was successfully removed from your colleagues.`);
  }

  onColleagueRemovalError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo} could not be removed from your colleagues.`);
  }

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
    this.refreshFriendsAndRequests();
    this.snackBarService.showInfo(`${pseudo} was successfully added to your colleagues.`);
  }

  onColleagueAcceptanceError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo} could not be added to your colleagues.`);
  }

  onColleagueRejected(pseudo: string): void {
    this.refreshFriendsAndRequests();
    this.snackBarService.showInfo(`${pseudo}'s request was rejected.`);
  }

  onColleagueRejectionError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo}'s colleague could not be rejected.`);
  }
}
