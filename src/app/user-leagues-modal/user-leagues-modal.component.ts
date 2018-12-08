import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../model/league';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-leagues-modal',
  templateUrl: './user-leagues-modal.component.html',
  styleUrls: ['./user-leagues-modal.component.css']
})
export class UserLeaguesModalComponent implements OnInit {

  @Input() league: League;
  @Output() leagueCreated = new EventEmitter();

  invalidName:     boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.invalidName = false;
    this.invalidResponse =  false;
  }

  ngOnInit() {
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmitForm(): void {
    if (this.league.name.length === 0) {
      this.invalidName = true;
    } else {
      this.invalidName = false;
      this.userService.createLeague(this.league).subscribe(league => this.onValidResponse(), error => this.onInvalidResponse(error));
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.leagueCreated.emit(true);
    this.close();
  }

  onInvalidResponse(error): void {
    this.invalidResponse = true;
  }

}
