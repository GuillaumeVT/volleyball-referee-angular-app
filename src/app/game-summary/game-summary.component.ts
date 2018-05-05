import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit {

  @Input() date:      number;
  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  @Output() teamsSwapped = new EventEmitter();

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getTeamName(teamType: TeamType): string {
    var name;

    if (TeamType.Home === teamType) {
      name = this.game.hTeam.name;
    } else {
      name = this.game.gTeam.name;
    }

    return name;
  }

  getTeamSets(teamType: TeamType): string {
    var sets;

    if (TeamType.Home === teamType) {
      sets = this.game.hSets;
    } else {
      sets = this.game.gSets;
    }

    return sets;
  }

  swapTeams(): void {
    this.teamsSwapped.emit();
  }

}
