import { Game } from 'src/app/shared/models/game.model';
import { TeamType } from 'src/app/shared/models/team-type.model';

import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-set-selector',
  templateUrl: './set-selector.component.html',
  styleUrls: ['./set-selector.component.css']
})
export class SetSelectorComponent implements OnChanges {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  @Output() currentSetUpdated = new EventEmitter(true);

  currentSet: number;

  constructor() {
    this.currentSet = -1;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets && this.currentSet < 0) {
      this.onViewSet(this.game.sets.length -1);
    }
  }

  ngAfterViewChecked() {
    if (this.game && this.game.sets && this.currentSet >= 0) {
      this.activateSelectedButton();
    }
  }

  onViewSet(setIndex: number): void {
    this.currentSet = setIndex;
    this.currentSetUpdated.emit(this.currentSet);
  }

  activateSelectedButton(): void {
    var selector = document.getElementById("selector");
    var buttons = selector.getElementsByClassName("vbr-button-unselected");
    for (var index = 0; index < buttons.length; index++) {
      var buttonClasses = buttons[index].classList;
      buttonClasses.remove("vbr-button-selected");

      if (index === this.currentSet) {
        buttonClasses.add("vbr-button-selected");
      }
    }
  }

  getScore(setIndex: number): string {
    const homePoints = this.game.sets[setIndex].homePoints;
    const guestPoints = this.game.sets[setIndex].guestPoints;

    if (TeamType.Home === this.leftTeam) {
      return homePoints + '-' + guestPoints;
    } else {
      return guestPoints + '-' + homePoints;
    }
  }

}
