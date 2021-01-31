import { UserRulesModalComponent } from 'src/app/modules/user-data/components/user-rules-modal/user-rules-modal.component';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { Game } from 'src/app/shared/models/game.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  @Output() teamsSwapped = new EventEmitter();

  constructor(public playerStyleService: PlayerStyleService, private modalService: NgbModal) { }

  getTeamName(teamType: TeamType): string {
    var name: string;

    if (TeamType.Home === teamType) {
      name = this.game.homeTeam.name;
    } else {
      name = this.game.guestTeam.name;
    }

    return name;
  }

  getTeamSets(teamType: TeamType): number {
    var sets: number;

    if (TeamType.Home === teamType) {
      sets = this.game.homeSets;
    } else {
      sets = this.game.guestSets;
    }

    return sets;
  }

  swapTeams(): void {
    this.teamsSwapped.emit();
  }

  viewRules(): void {
    const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
    modalRef.componentInstance.rules = this.game.rules;
    modalRef.componentInstance.crudType = CrudType.View;
  }

}
