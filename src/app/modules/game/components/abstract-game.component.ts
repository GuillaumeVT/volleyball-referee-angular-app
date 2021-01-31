import { Game } from 'src/app/shared/models/game.model';
import { TeamType } from 'src/app/shared/models/team-type.model';

import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive()
export abstract class AbstractGameComponent {

  @Input() gameId:     string;
  @Input() game:       Game;
  @Input() currentSet: number;
  @Input() leftTeam:   TeamType;
  @Input() rightTeam:  TeamType;

  @Output() teamsSwapped = new EventEmitter();
  @Output() currentSetUpdated = new EventEmitter(true);

  constructor() { }

  onCurrentSetUpdated(setIndex: number): void {
    this.currentSetUpdated.emit(setIndex);
  }

  onTeamsSwapped(): void {
    this.teamsSwapped.emit();
  }

}
