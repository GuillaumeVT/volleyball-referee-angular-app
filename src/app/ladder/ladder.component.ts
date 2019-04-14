import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { LadderItem } from './ladder-item';
import { Utils } from '../utils/utils';
import { Substitution } from '../model/substitution';
import { Timeout } from '../model/timeout';
import { Sanction } from '../model/sanction';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styleUrls: ['./ladder.component.css']
})
export class LadderComponent implements OnInit, OnChanges {

  @Input() game:       Game;
  @Input() setIndex:   number;
  @Input() topTeam:    TeamType;
  @Input() bottomTeam: TeamType;

  ladder: LadderItem[];

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.game && this.game.sets) {
      this.updateLadder();
      this.addSubstitutions(this.game.sets[this.setIndex].homeSubstitutions, TeamType.Home);
      this.addSubstitutions(this.game.sets[this.setIndex].guestSubstitutions, TeamType.Guest);
      this.addTimeouts(this.game.sets[this.setIndex].homeCalledTimeouts, TeamType.Home);
      this.addTimeouts(this.game.sets[this.setIndex].guestCalledTimeouts, TeamType.Guest);
      this.addSanctions(this.game.homeCards, TeamType.Home);
      this.addSanctions(this.game.guestCards, TeamType.Guest);
    }
  }

  updateLadder(): void {
    this.ladder = [];
    var homePoints = 0;
    var guestPoints = 0;

    for (let strTeamType of this.game.sets[this.setIndex].ladder) {
      var item: LadderItem;
      if (strTeamType === 'H') {
        homePoints++;
        item = new LadderItem(TeamType.Home, homePoints, guestPoints);
        this.ladder.push(item);
      } else {
        guestPoints++;
        item = new LadderItem(TeamType.Guest, guestPoints, homePoints);
        this.ladder.push(item);
      }
    }
  }

  addSubstitutions(substitutions: Substitution[], teamType: TeamType): void {
    for (let substitution of substitutions) {
      var homePoints = substitution.homePoints;
      var guestPoints = substitution.guestPoints;

      for (let item of this.ladder) {
        if  (item.teamType === TeamType.Home) {
          if (homePoints === item.score && guestPoints === item.oScore) {
            item.addSubstitution(teamType, substitution);
          }
        } else {
          if (guestPoints === item.score && homePoints === item.oScore) {
            item.addSubstitution(teamType, substitution);
          }
        }
      }
    }
  }

  addTimeouts(timeouts: Timeout[], teamType: TeamType): void {
    for (let timeout of timeouts) {
      var homePoints = timeout.homePoints;
      var guestPoints = timeout.guestPoints;

      for (let item of this.ladder) {
        if  (item.teamType === TeamType.Home) {
          if (homePoints === item.score && guestPoints === item.oScore) {
            item.addTimeout(teamType, timeout);
          }
        } else {
          if (guestPoints === item.score && homePoints === item.oScore) {
            item.addTimeout(teamType, timeout);
          }
        }
      }
    }
  }

  addSanctions(sanctions: Sanction[], teamType: TeamType): void {
    for (let sanction of sanctions) {
      if (this.setIndex === sanction.set) {
        var homePoints = sanction.homePoints;
        var guestPoints = sanction.guestPoints;

        for (let item of this.ladder) {
          if  (item.teamType === TeamType.Home) {
            if (homePoints === item.score && guestPoints === item.oScore) {
              item.addSanction(teamType, sanction);
            }
          } else {
            if (guestPoints === item.score && homePoints === item.oScore) {
              item.addSanction(teamType, sanction);
            }
          }
        }
      }
    }
  }

  getTeamScore(ladderItem: LadderItem, teamType: TeamType) {
    if (ladderItem.teamType === teamType) {
      return ladderItem.score;
    } else {
      return '';
    }
  }

  getTeamTextColor(ladderItem: LadderItem, teamType: TeamType) {
    if (ladderItem.teamType === teamType) {
      return this.utils.getTeamTextColor(this.game, teamType);
    } else {
      return '#f3f3f3';
    }
  }

  getTeamBackgroundColor(ladderItem: LadderItem, teamType: TeamType) {
    if (ladderItem.teamType === teamType) {
      return this.utils.getTeamBackgroundColor(this.game, teamType);
    } else {
      return '#f3f3f3';
    }
  }

  getIcon(ladderItem: LadderItem, teamType: TeamType) {
    var icon = '';

    if (ladderItem.hasSeveralEvents(teamType)) {
      icon = '../../assets/ic_list.png';
    } else if (ladderItem.hasSubstitutionEvents(teamType)) {
      icon = '../../assets/ic_sub.png'
    } else if (ladderItem.hasTimeoutEvents(teamType)) {
      icon = '../../assets/ic_timer.png';
    } else if (ladderItem.hasSanctionEvents(teamType)) {
      icon = '../../assets/ic_expulsion_card.png';
    }

    return icon;
  }

  getSubstitutions(ladderItem: LadderItem, teamType: TeamType): Substitution[] {
    if (ladderItem.teamType === teamType) {
      return ladderItem.substitutions;
    } else {
      return ladderItem.oSubstitutions;
    }
  }

  getTimeouts(ladderItem: LadderItem, teamType: TeamType): Timeout[] {
    if (ladderItem.teamType === teamType) {
      return ladderItem.timeouts;
    } else {
      return ladderItem.oTimeouts;
    }
  }

  getSanctions(ladderItem: LadderItem, teamType: TeamType): Sanction[] {
    if (ladderItem.teamType === teamType) {
      return ladderItem.sanctions;
    } else {
      return ladderItem.oSanctions;
    }
  }

}
