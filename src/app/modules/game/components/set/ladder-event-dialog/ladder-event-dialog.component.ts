import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LadderItem } from '@game/components/set/ladder/ladder-item.model';
import { SanctionService } from '@game/services/sanction.service';
import { Game, Sanction } from '@shared/models/game.model';
import { Substitution, Timeout } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-ladder-event-dialog',
  templateUrl: './ladder-event-dialog.component.html',
  styleUrls: ['./ladder-event-dialog.component.scss'],
})
export class LadderEventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LadderEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LadderEventDialogData,
    public sanctionService: SanctionService,
    public playerStyleService: PlayerStyleService,
  ) {}

  getSubstitutions(): Substitution[] {
    if (this.data.ladderItem.teamType === this.data.teamType) {
      return this.data.ladderItem.substitutions;
    } else {
      return this.data.ladderItem.oSubstitutions;
    }
  }

  getTimeouts(): Timeout[] {
    if (this.data.ladderItem.teamType === this.data.teamType) {
      return this.data.ladderItem.timeouts;
    } else {
      return this.data.ladderItem.oTimeouts;
    }
  }

  getSanctions(): Sanction[] {
    if (this.data.ladderItem.teamType === this.data.teamType) {
      return this.data.ladderItem.sanctions;
    } else {
      return this.data.ladderItem.oSanctions;
    }
  }
}

export interface LadderEventDialogData {
  game: Game;
  ladderItem: LadderItem;
  teamType: TeamType;
}
