import { Friend, FriendRequest, FriendsAndRequests } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserColleagueDialogComponent } from 'src/app/modules/user-data/components/user-colleague-dialog/user-colleague-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-colleagues',
  templateUrl: './user-colleagues.component.html',
  styleUrls: ['./user-colleagues.component.scss']
})
export class UserColleaguesComponent implements OnInit {

  friendsAndRequests: FriendsAndRequests;

  constructor(private titleService: Title, private userService: UserService, private dialog: MatDialog, private snackBarService: SnackBarService, private translate: TranslateService) {
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
    dialogRef.afterClosed().subscribe(pseudo => {
      if (pseudo) {
        this.onAddColleagueRequested(pseudo);
      }
    });
  }

  removeColleague(friend: Friend): void {
    this.translate.get(['user.colleague.remove', 'user.colleague.messages.remove-question'], {pseudo: friend.pseudo}).subscribe(
      ts => {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: "500px",
          data: { title: ts['user.colleague.remove'], message: ts['user.colleague.messages.remove-question'] }
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.userService.removeFriend(friend.id).subscribe(_deleted => this.onColleagueRemoved(friend.pseudo), _error => this.onColleagueRemovalError(friend.pseudo));
          }
        });
      }
    );
  }

  onAddColleagueRequested(receiverPseudo: string): void {
    this.translate.get('user.colleague.messages.request-sent', {pseudo: receiverPseudo}).subscribe(
      t =>  this.snackBarService.showError(t)
    );
  }

  onColleagueRemoved(pseudo: string): void {
    this.refreshFriendsAndRequests();
  }

  onColleagueRemovalError(pseudo: string): void {
    this.translate.get('user.colleague.messages.removed-error', {pseudo: pseudo}).subscribe(
      t =>  this.snackBarService.showError(t)
    );
  }

  acceptColleague(friendRequest: FriendRequest): void {
    this.userService.acceptFriendRequest(friendRequest.id).subscribe(
      _success => this.onColleagueAccepted(friendRequest.senderPseudo),
      _error => this.onColleagueAcceptanceError(friendRequest.senderPseudo)
    );
  }

  rejectColleague(friendRequest: FriendRequest): void {
    this.userService.rejectFriendRequest(friendRequest.id).subscribe(
      _success => this.onColleagueRejected(friendRequest.senderPseudo),
      _error => this.onColleagueRejectionError(friendRequest.senderPseudo)
    );
  }

  onColleagueAccepted(pseudo: string): void {
    this.refreshFriendsAndRequests();
  }

  onColleagueAcceptanceError(pseudo: string): void {
    this.translate.get('user.colleague.messages.request-added-error', {pseudo: pseudo}).subscribe(
      t =>  this.snackBarService.showError(t)
    );
  }

  onColleagueRejected(pseudo: string): void {
    this.refreshFriendsAndRequests();
  }

  onColleagueRejectionError(pseudo: string): void {
    this.translate.get('user.colleague.messages.request-rejected-error', {pseudo: pseudo}).subscribe(
      t =>  this.snackBarService.showError(t)
    );
  }
}
