import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Game } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-set-summary',
  templateUrl: './set-summary.component.html',
  styleUrls: ['./set-summary.component.scss'],
})
export class SetSummaryComponent implements OnChanges {
  @Input() public game: Game;
  @Input() public leftTeam: TeamType;
  @Input() public rightTeam: TeamType;

  @Output() public currentSetUpdated = new EventEmitter(true);

  public currentSet: UntypedFormControl;

  private _homePoints: number;
  private _guestPoints: number;
  public duration: string;
  private _homeTimeouts: number[];
  private _guestTimeouts: number[];

  constructor(public playerStyleService: PlayerStyleService) {
    this.currentSet = new UntypedFormControl(-1);
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    this.init();
  }

  private init(): void {
    if (this.game && this.game.sets) {
      if (this.currentSet.value < 0) {
        this.selectSet(this.game.sets.length - 1);
      }

      const setIndex = this.currentSet.value;
      this._homePoints = this.game.sets[setIndex].homePoints;
      this._guestPoints = this.game.sets[setIndex].guestPoints;
      this.duration = ` ${Math.ceil(this.game.sets[setIndex].duration / 60000)} min`;

      this._homeTimeouts = [];
      this._guestTimeouts = [];
      var index;
      for (index = 0; index < this.game.sets[setIndex].homeTimeouts; index++) {
        this._homeTimeouts.push(1);
      }
      for (index = 0; index < this.game.sets[setIndex].guestTimeouts; index++) {
        this._guestTimeouts.push(1);
      }
    }
  }

  public selectSet(setIndex: number): void {
    this.currentSet.setValue(setIndex);
    this.currentSetUpdated.emit(this.currentSet.value);
    this.init();
  }

  public getPoints(teamType: TeamType): number {
    var points;

    if (TeamType.Home === teamType) {
      points = this._homePoints;
    } else {
      points = this._guestPoints;
    }

    return points;
  }

  public getTimeouts(teamType: TeamType): number[] {
    var timeouts;

    if (TeamType.Home === teamType) {
      timeouts = this._homeTimeouts;
    } else {
      timeouts = this._guestTimeouts;
    }

    return timeouts;
  }
}
