import { Friend, UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { GameSummary } from 'src/app/shared/models/game.model';

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-referee-modal',
  templateUrl: './game-referee-modal.component.html',
  styleUrls: ['./game-referee-modal.component.css']
})
export class GameRefereeModalComponent implements OnInit, AfterViewInit {

  @Input() game: GameSummary;
  @Input() user: UserSummary;

  @Output() refereeUpdated = new EventEmitter();

  me:              Friend;
  selectedReferee: Friend;
  friends:         Friend[];

  constructor(private activeModal: NgbActiveModal, private gameService: GameService, private userService: UserService) {}

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
    this.userService.listFriendsAndRequests().subscribe(
      friendsAndRequests => {
        this.friends = friendsAndRequests.friends;
        if (this.game.refereedBy === this.me.id) {
          this.selectedReferee = this.me;
        } else {
          for (let friend of this.friends) {
            if (this.game.refereedBy === friend.id) {
              this.selectedReferee = friend;
            }
          }
        }
      },
      error => {
        this.friends = [];
        this.selectedReferee = this.me;
      });
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
