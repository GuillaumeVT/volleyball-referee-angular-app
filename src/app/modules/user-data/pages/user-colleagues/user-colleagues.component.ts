import { Friend, FriendsAndRequests } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserColleagueModalComponent } from 'src/app/modules/user-data/components/user-colleague-modal/user-colleague-modal.component';
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
    const modalRef = this.modalService.open(UserColleagueModalComponent, { size: 'lg' });
    modalRef.componentInstance.addColleagueRequested.subscribe((receiverPseudo: string) => this.onAddColleagueRequested(receiverPseudo));
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
}
