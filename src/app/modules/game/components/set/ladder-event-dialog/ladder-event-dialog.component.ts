import { LadderItem } from 'src/app/modules/game/components/set/ladder/ladder-item.model';
import { SanctionService } from 'src/app/modules/game/services/sanction.service';
import { Game, Sanction } from 'src/app/shared/models/game.model';
import { Substitution, Timeout } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
