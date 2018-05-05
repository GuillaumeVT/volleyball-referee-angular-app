import { Game } from '../model/game';
import { Substitution } from '../model/substitution';
import { TeamType } from '../model/teamtype';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set-substitutions',
  templateUrl: './set-substitutions.component.html',
  styleUrls: ['./set-substitutions.component.css']
})
export class SetSubstitutionsComponent implements OnInit {

  @Input() game:      Game;
  @Input() setIndex:  number;
  @Input() leftTeam:  TeamType;
  @Input() rightTeam: TeamType;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getSubstitutions(teamType: TeamType): Substitution[] {
    if (TeamType.Home === teamType) {
      return this.game.sets[this.setIndex].hSubstitutions;
    } else {
      return this.game.sets[this.setIndex].gSubstitutions;
    }
  }

  getScore(teamType: TeamType, substitution: Substitution): string {
    if (TeamType.Home === teamType) {
      return substitution.hPoints + '-' + substitution.gPoints;
    } else {
      return substitution.gPoints + '-' + substitution.hPoints;
    }
  }

}
