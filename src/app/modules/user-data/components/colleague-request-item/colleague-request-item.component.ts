import { FriendRequest } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-colleague-request-item',
  templateUrl: './colleague-request-item.component.html',
  styleUrls: ['./colleague-request-item.component.css']
})
export class ColleagueRequestItemComponent {

  @Input() friendRequest: FriendRequest;
  @Output() mustRefreshFriendRequestsReceivedBy = new EventEmitter();

  constructor(private userService: UserService, private modalService: NgbModal, private snackBarService: SnackBarService) { }

  acceptColleague(friendRequest: FriendRequest): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Accept colleague';
    modalRef.componentInstance.message = `Do you want to add ${friendRequest.senderPseudo} as colleague?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.userService.acceptFriendRequest(friendRequest.id).subscribe(
        _success => this.onColleagueAccepted(friendRequest.senderPseudo),
        _error => this.onColleagueAcceptanceError(friendRequest.senderPseudo)
      )
    );
  }

  rejectColleague(friendRequest: FriendRequest): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Reject colleague';
    modalRef.componentInstance.message = `Do you want to reject ${friendRequest.senderPseudo}'s request?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.userService.rejectFriendRequest(friendRequest.id).subscribe(
        _success => this.onColleagueRejected(friendRequest.senderPseudo),
        _error => this.onColleagueRejectionError(friendRequest.senderPseudo)
      )
    );
  }

  onColleagueAccepted(pseudo: string): void {
    this.mustRefreshFriendRequestsReceivedBy.emit(true);
    this.snackBarService.showInfo(`${pseudo} was successfully added to your colleagues.`, 5000);
  }

  onColleagueAcceptanceError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo} could not be added to your colleagues.`, 5000);
  }

  onColleagueRejected(pseudo: string): void {
    this.mustRefreshFriendRequestsReceivedBy.emit(true);
    this.snackBarService.showInfo(`${pseudo}'s request was rejected.`, 5000);
  }

  onColleagueRejectionError(pseudo: string): void {
    this.snackBarService.showError(`${pseudo}'s colleague could not be rejected.`, 5000);
  }

}
