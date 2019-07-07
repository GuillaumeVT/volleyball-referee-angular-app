import { Component, OnInit } from '@angular/core';
import { UserSummary, Friend, FriendsAndRequests } from '../model/user';
import { UserService } from '../services/user.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserColleagueModalComponent } from './user-colleague-modal/user-colleague-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-colleagues',
  templateUrl: './user-colleagues.component.html',
  styleUrls: ['./user-colleagues.component.css']
})
export class UserColleaguesComponent implements OnInit {

  friendsAndRequests: FriendsAndRequests;

  constructor(private titleService: Title, private userService: UserService, private modalService: NgbModal, private toastr: ToastrService) {
    this.titleService.setTitle('VBR - My Colleagues');
  }

  ngOnInit() {
    this.refreshFriendsAndRequests();
  }

  refreshFriendsAndRequests(): void {
    this.userService.listFriendsAndRequests().subscribe(friendsAndRequests => this.friendsAndRequests = friendsAndRequests, error => this.friendsAndRequests = null);
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
    this.toastr.success(`A request was successfully sent to ${receiverPseudo}`, '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onColleagueRemoved(pseudo: string): void {
    this.refreshFriendsAndRequests();
    this.toastr.success(`${pseudo} was successfully removed from your colleagues`, '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onColleagueRemovalError(pseudo: string): void {
    this.toastr.error(`${pseudo} could not be removed from your colleagues`, '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getPageNumber(): number {
    return 5;
  }

}
