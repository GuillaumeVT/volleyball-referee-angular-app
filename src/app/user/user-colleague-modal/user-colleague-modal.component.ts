import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-colleague-modal',
  templateUrl: './user-colleague-modal.component.html',
  styleUrls: ['./user-colleague-modal.component.css']
})
export class UserColleagueModalComponent implements OnInit {

  @Output() addColleagueRequested = new EventEmitter();

  pseudo: string;

  undefinedPseudo:   boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.undefinedPseudo = false;
    this.invalidResponse =  false;
  }

  ngOnInit() {
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

  onInvalidResponse(error): void {
    this.invalidResponse = true;
  }

}
