import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Friend, FriendRequest, FriendsAndRequests } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { UserColleagueDialogComponent } from '@user-data/components/user-colleague-dialog/user-colleague-dialog.component';

@Component({
  selector: 'app-user-colleagues',
  templateUrl: './user-colleagues.component.html',
  styleUrls: ['./user-colleagues.component.scss'],
})
export class UserColleaguesComponent implements OnInit {
  public friendsAndRequests: FriendsAndRequests;

  constructor(
    private _titleService: Title,
    private _userService: UserService,
    private _dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    this._translateService.get('user.colleague.page').subscribe((t) => this._titleService.setTitle(t));
  }

  public ngOnInit(): void {
    this.refreshFriendsAndRequests();
  }

  private refreshFriendsAndRequests(): void {
    this._userService.listFriendsAndRequests().subscribe({
      next: (friendsAndRequests) => (this.friendsAndRequests = friendsAndRequests),
      error: (_) => (this.friendsAndRequests = null),
    });
  }

  public addColleague(): void {
    const dialogRef = this._dialog.open(UserColleagueDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe((pseudo) => {
      if (pseudo) {
        this.onAddColleagueRequested(pseudo);
      }
    });
  }

  public removeColleague(friend: Friend): void {
    this._translateService
      .get(['user.colleague.remove', 'user.colleague.messages.remove-question'], { pseudo: friend.pseudo })
      .subscribe((ts) => {
        const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
          width: '500px',
          data: { title: ts['user.colleague.remove'], message: ts['user.colleague.messages.remove-question'] },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this._userService.removeFriend(friend.id).subscribe({
              next: (_deleted) => this.onColleagueRemoved(friend.pseudo),
              error: (_) => this.onColleagueRemovalError(friend.pseudo),
            });
          }
        });
      });
  }

  private onAddColleagueRequested(receiverPseudo: string): void {
    this._translateService
      .get('user.colleague.messages.request-sent', { pseudo: receiverPseudo })
      .subscribe((t) => this._snackBarService.showError(t));
  }

  private onColleagueRemoved(_pseudo: string): void {
    this.refreshFriendsAndRequests();
  }

  private onColleagueRemovalError(pseudo: string): void {
    this._translateService
      .get('user.colleague.messages.removed-error', { pseudo: pseudo })
      .subscribe((t) => this._snackBarService.showError(t));
  }

  public acceptColleague(friendRequest: FriendRequest): void {
    this._userService.acceptFriendRequest(friendRequest.id).subscribe({
      next: (_success) => this.onColleagueAccepted(friendRequest.senderPseudo),
      error: (_) => this.onColleagueAcceptanceError(friendRequest.senderPseudo),
    });
  }

  public rejectColleague(friendRequest: FriendRequest): void {
    this._userService.rejectFriendRequest(friendRequest.id).subscribe({
      next: (_success) => this.onColleagueRejected(friendRequest.senderPseudo),
      error: (_) => this.onColleagueRejectionError(friendRequest.senderPseudo),
    });
  }

  private onColleagueAccepted(_pseudo: string): void {
    this.refreshFriendsAndRequests();
  }

  private onColleagueAcceptanceError(pseudo: string): void {
    this._translateService
      .get('user.colleague.messages.request-added-error', { pseudo: pseudo })
      .subscribe((t) => this._snackBarService.showError(t));
  }

  private onColleagueRejected(pseudo: string): void {
    this.refreshFriendsAndRequests();
  }

  private onColleagueRejectionError(pseudo: string): void {
    this._translateService
      .get('user.colleague.messages.request-rejected-error', { pseudo: pseudo })
      .subscribe((t) => this._snackBarService.showError(t));
  }
}
