import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../../model/league';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-user-league-modal',
  templateUrl: './user-league-modal.component.html',
  styleUrls: ['./user-league-modal.component.css']
})
export class UserLeagueModalComponent implements OnInit {

  @Input() league: League;
  @Output() leagueCreated = new EventEmitter();

  undefinedName:   boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private leagueService: LeagueService) {
    this.undefinedName = false;
    this.invalidResponse =  false;
  }

  ngOnInit() {
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmitForm(): void {
    if (this.league.name.length === 0) {
      this.undefinedName = true;
    } else {
      this.undefinedName = false;
      this.league.createdAt = new Date().getTime();
      this.league.updatedAt = new Date().getTime();
      this.leagueService.createLeague(this.league).subscribe(league => this.onValidResponse(), error => this.onInvalidResponse(error));
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
