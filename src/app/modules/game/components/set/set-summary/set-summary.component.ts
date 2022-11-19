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
  @Input() game: Game;
  @Input() leftTeam: TeamType;
  @Input() rightTeam: TeamType;

  @Output() currentSetUpdated = new EventEmitter(true);

  currentSet: UntypedFormControl;

  homePoints: number;
  guestPoints: number;
  duration: string;
  homeTimeouts: number[];
  guestTimeouts: number[];

  constructor(public playerStyleService: PlayerStyleService) {
    this.currentSet = new UntypedFormControl(-1);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.init();
  }

  private init(): void {
    if (this.game && this.game.sets) {
      if (this.currentSet.value < 0) {
        this.selectSet(this.game.sets.length - 1);
      }

      const setIndex = this.currentSet.value;
      this.homePoints = this.game.sets[setIndex].homePoints;
      this.guestPoints = this.game.sets[setIndex].guestPoints;
      this.duration = ` ${Math.ceil(this.game.sets[setIndex].duration / 60000)} min`;

      this.homeTimeouts = [];
      this.guestTimeouts = [];
      var index;
      for (index = 0; index < this.game.sets[setIndex].homeTimeouts; index++) {
        this.homeTimeouts.push(1);
      }
      for (index = 0; index < this.game.sets[setIndex].guestTimeouts; index++) {
        this.guestTimeouts.push(1);
      }
    }
  }

  selectSet(setIndex: number): void {
    this.currentSet.setValue(setIndex);
    this.currentSetUpdated.emit(this.currentSet.value);
    this.init();
  }

  getPoints(teamType: TeamType): number {
    var points;

    if (TeamType.Home === teamType) {
      points = this.homePoints;
    } else {
      points = this.guestPoints;
    }

    return points;
  }

  getTimeouts(teamType: TeamType): number[] {
    var timeouts;

    if (TeamType.Home === teamType) {
      timeouts = this.homeTimeouts;
    } else {
      timeouts = this.guestTimeouts;
    }

    return timeouts;
  }
}
