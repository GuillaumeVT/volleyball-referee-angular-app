import { ToastrService } from 'ngx-toastr';
import { FriendRequest } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colleague-request-item',
  templateUrl: './colleague-request-item.component.html',
  styleUrls: ['./colleague-request-item.component.css']
})
export class ColleagueRequestItemComponent {

  @Input() friendRequest: FriendRequest;
  @Output() mustRefreshFriendRequestsReceivedBy = new EventEmitter();

  constructor(private userService: UserService, private modalService: NgbModal, private toastr: ToastrService) { }

  acceptColleague(friendRequest: FriendRequest): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Accept colleague';
    modalRef.componentInstance.message = `Do you want to add ${friendRequest.senderPseudo} as colleague?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.userService.acceptFriendRequest(friendRequest.id).subscribe(
        success => this.onColleagueAccepted(friendRequest.senderPseudo),
        error => this.onColleagueAcceptanceError(friendRequest.senderPseudo)
      )
    );
  }

  rejectColleague(friendRequest: FriendRequest): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Reject colleague';
    modalRef.componentInstance.message = `Do you want to reject ${friendRequest.senderPseudo}'s request?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.userService.rejectFriendRequest(friendRequest.id).subscribe(
        success => this.onColleagueRejected(friendRequest.senderPseudo),
        error => this.onColleagueRejectionError(friendRequest.senderPseudo)
      )
    );
  }

  onColleagueAccepted(pseudo: string): void {
    this.mustRefreshFriendRequestsReceivedBy.emit(true);
    this.toastr.success(`${pseudo} was successfully added to your colleagues`, '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onColleagueAcceptanceError(pseudo: string): void {
    this.toastr.error(`${pseudo} could not be added to your colleagues`, '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  onColleagueRejected(pseudo: string): void {
    this.mustRefreshFriendRequestsReceivedBy.emit(true);
    this.toastr.success(`${pseudo}'s request was rejected`, '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onColleagueRejectionError(pseudo: string): void {
    this.toastr.error(`${pseudo}'s colleague could not be rejected`, '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

}
