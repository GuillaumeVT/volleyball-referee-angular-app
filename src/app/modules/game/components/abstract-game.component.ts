import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';

@Directive()
export abstract class AbstractGameComponent {
  @Input() public gameId: string;
  @Input() public game: Game;
  @Input() public currentSet: number;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;

  @Output() public teamsSwapped = new EventEmitter();
  @Output() public currentSetUpdated = new EventEmitter(true);

  constructor() {}

  public onCurrentSetUpdated(setIndex: number): void {
    this.currentSetUpdated.emit(setIndex);
  }

  public onTeamsSwapped(): void {
    this.teamsSwapped.emit();
  }
}
