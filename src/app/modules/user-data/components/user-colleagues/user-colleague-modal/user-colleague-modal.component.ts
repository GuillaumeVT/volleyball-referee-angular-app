import { UserService } from 'src/app/core/services/user.service';

import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-colleague-modal',
  templateUrl: './user-colleague-modal.component.html',
  styleUrls: ['./user-colleague-modal.component.css']
})
export class UserColleagueModalComponent {

  @Output() addColleagueRequested = new EventEmitter();

  pseudo: string;

  undefinedPseudo:   boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.undefinedPseudo = false;
    this.invalidResponse =  false;
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmitForm(): void {
    if (this.pseudo.length === 0) {
      this.undefinedPseudo = true;
    } else {
      this.undefinedPseudo = false;
      this.userService.sendFriendRequest(this.pseudo).subscribe(success => this.onValidResponse(), error => this.onInvalidResponse(error));
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.addColleagueRequested.emit(this.pseudo);
    this.close();
  }

  onInvalidResponse(_error: any): void {
    this.invalidResponse = true;
  }

}
