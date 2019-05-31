import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User, Friend } from '../../model/user';
import { GameDescription } from '../../model/game-description';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-referee-modal',
  templateUrl: './game-referee-modal.component.html',
  styleUrls: ['./game-referee-modal.component.css']
})
export class GameRefereeModalComponent implements OnInit, AfterViewInit {

  @Input() game: GameDescription;
  @Input() user: User;

  @Output() refereeUpdated = new EventEmitter();

  me:              Friend;
  selectedReferee: Friend;

  constructor(private activeModal: NgbActiveModal, private gameService: GameService) {}

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.game) {
      setTimeout(() => this.initForm(), 0);
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    this.me = new Friend(this.user.id, this.user.pseudo);

    if (this.game.refereedBy === this.me.id) {
      this.selectedReferee = this.me;
    } else {
      for (let friend of this.user.friends) {
        if (this.game.refereedBy === friend.id) {
          this.selectedReferee = friend;
        }
      }
    }
  }

  onSubmitForm(): void {
    this.gameService.updateReferee(this.game.id, this.selectedReferee.id).subscribe(success => this.onValidResponse(), error => this.onInvalidResponse());
  }

  onValidResponse(): void {
    this.refereeUpdated.emit(true);
    this.close();
  }

  onInvalidResponse(): void { }

}
