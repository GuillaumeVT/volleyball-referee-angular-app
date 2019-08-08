import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team, Player } from '../../model/team';

@Component({
  selector: 'app-player-names-modal',
  templateUrl: './player-names-modal.component.html',
  styleUrls: ['./player-names-modal.component.css']
})
export class PlayerNamesModalComponent implements OnInit {

  @Input() team: Team;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  close(): void {
    this.activeModal.close();
  }

  buildId(playerNumber: number): string {
    return `player-name-${playerNumber}`;
  }

}
