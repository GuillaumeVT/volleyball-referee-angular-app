import { Friend, FriendsAndRequests } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserColleagueModalComponent } from 'src/app/modules/user-data/components/user-colleague-modal/user-colleague-modal.component';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-user-colleagues',
  templateUrl: './user-colleagues.component.html',
  styleUrls: ['./user-colleagues.component.css']
})
export class UserColleaguesComponent implements OnInit {

  friendsAndRequests: FriendsAndRequests;

  constructor(private titleService: Title, private userService: UserService, private modalService: NgbModal, private snackBarService: SnackBarService) {
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
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Remove colleague';
    modalRef.componentInstance.message = `Do you want to remove ${friend.pseudo}?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.userService.removeFriend(friend.id).subscribe(_deleted => this.onColleagueRemoved(friend.pseudo), _error => this.onColleagueRemovalError(friend.pseudo)));
  }

  onAddColleagueRequested(receiverPseudo: string): void {
    this.snackBarService.showInfo(`A request was successfully sent to ${receiverPseudo}.`, 5000);
  }

  onColleagueRemoved(pseudo: string): void {
    this.refreshFriendsAndRequests();
    this.snackBarService.showInfo(`${pseudo} was successfully removed from your colleagues.`, 5000);
  }

  onColleagueRemovalError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo} could not be removed from your colleagues.`, 5000);
  }
}
