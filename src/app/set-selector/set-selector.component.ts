import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-set-selector',
  templateUrl: './set-selector.component.html',
  styleUrls: ['./set-selector.component.css']
})
export class SetSelectorComponent implements OnInit, OnChanges {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  @Output() currentSetUpdated = new EventEmitter(true);

  currentSet: number;

  constructor() {
    this.currentSet = -1;
  }

  ngOnInit() {
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
    var buttons = selector.getElementsByClassName("btn-set");
    for (var index = 0; index < buttons.length; index++) {
      var buttonClasses = buttons[index].classList;
      buttonClasses.remove("active");

      if (index === this.currentSet) {
        buttonClasses.add("active");
      }
    }
  }

  getScore(setIndex: number): string {
    const hPoints = this.game.sets[setIndex].hPoints;
    const gPoints = this.game.sets[setIndex].gPoints;

    if (TeamType.Home === this.leftTeam) {
      return hPoints + '-' + gPoints;
    } else {
      return gPoints + '-' + hPoints;
    }
  }

}
