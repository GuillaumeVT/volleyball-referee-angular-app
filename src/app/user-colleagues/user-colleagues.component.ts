import { Component, Injector } from '@angular/core';
import { AbstractUserDataComponent } from '../user/abstract-user-data.component';
import { Friend } from '../model/user';
import { FriendRequest } from '../model/friend-request';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserColleagueModalComponent } from '../user-colleague-modal/user-colleague-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-colleagues',
  templateUrl: './user-colleagues.component.html',
  styleUrls: ['./user-colleagues.component.css']
})
export class UserColleaguesComponent extends AbstractUserDataComponent {

  friendRequestsReceivedBy: FriendRequest[];

  constructor(injector: Injector, private titleService: Title, private modalService: NgbModal, private toastr: ToastrService) {
    super(injector);
    this.titleService.setTitle('VBR - My Colleagues');
    this.friendRequestsReceivedBy = [];
  }

  refreshData(): void {
    this.refreshFriends();
    this.refreshFriendRequestsReceivedBy();
  }

  refreshFriends(): void {
    this.userService.getUser().subscribe(user => this.user = user, error => this.user = null);
  }

  refreshFriendRequestsReceivedBy(): void {
    this.userService.listFriendRequestsReceivedBy().subscribe(friendRequests => this.friendRequestsReceivedBy = friendRequests, error => this.friendRequestsReceivedBy = []);
  }

  addColleague(): void {
    const modalRef = this.modalService.open(UserColleagueModalComponent, { size: 'lg' });
    modalRef.componentInstance.addColleagueRequested.subscribe(receiverPseudo => this.onAddColleagueRequested(receiverPseudo));
  }

  removeColleague(friend: Friend): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Remove colleague';
    modalRef.componentInstance.message = `Do you want to remove ${friend.pseudo}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.userService.removeFriend(friend.id).subscribe(deleted => this.onColleagueRemoved(friend.pseudo), error => this.onColleagueRemovalError(friend.pseudo)));
  }

  onAddColleagueRequested(receiverPseudo: string): void {
    this.toastr.success(`A colleague request was successfully sent to ${receiverPseudo}`, '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onColleagueRemoved(pseudo: string): void {
    this.refreshFriends();
    this.toastr.success(`${pseudo} was successfully removed from your colleagues`, '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onColleagueRemovalError(pseudo: string): void {
    this.toastr.error(`${pseudo} could not be removed from your colleagues`, '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

}
