import { Game } from '../model/game';
import { Sanction } from '../model/sanction';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-sanctions',
  templateUrl: './game-sanctions.component.html',
  styleUrls: ['./game-sanctions.component.css']
})
export class GameSanctionsComponent implements OnInit {

  @Input() game:      Game;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getSanctions(teamType: TeamType): Sanction[] {
    if (TeamType.Home === teamType) {
      return this.game.hCards;
    } else {
      return this.game.gCards;
    }
  }

  getScore(teamType: TeamType, sanction: Sanction): string {
    const set = 'Set ' + (sanction.set + 1) + '&nbsp;&nbsp';
    if (TeamType.Home === teamType) {
      return set + sanction.hPoints + '-' + sanction.gPoints;
    } else {
      return set + sanction.gPoints + '-' + sanction.hPoints;
    }
  }

}
