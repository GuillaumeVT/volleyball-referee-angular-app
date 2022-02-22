import {
  LadderEventDialogComponent,
  LadderEventDialogData,
} from 'src/app/modules/game/components/set/ladder-event-dialog/ladder-event-dialog.component';
import { LadderItem } from 'src/app/modules/game/components/set/ladder/ladder-item.model';
import { Game, Sanction } from 'src/app/shared/models/game.model';
import { Substitution, Timeout } from 'src/app/shared/models/set.model';
import { TeamType } from 'src/app/shared/models/team-type.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styleUrls: ['./ladder.component.scss'],
})
export class LadderComponent implements OnChanges {
  @Input() game: Game;
  @Input() setIndex: number;
  @Input() topTeam: TeamType;
  @Input() bottomTeam: TeamType;

  ladder: LadderItem[];

  constructor(public playerStyleService: PlayerStyleService, private dialog: MatDialog) {}

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
        if (item.teamType === TeamType.Home) {
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
        if (item.teamType === TeamType.Home) {
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
          if (item.teamType === TeamType.Home) {
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
      return this.playerStyleService.getTeamTextColor(this.game, teamType);
    } else {
      return '#ffffff';
    }
  }

  getTeamBackgroundColor(ladderItem: LadderItem, teamType: TeamType) {
    if (ladderItem.teamType === teamType) {
      return this.playerStyleService.getTeamBackgroundColor(this.game, teamType);
    } else {
      return '#ffffff';
    }
  }

  getTeamBorderColor(ladderItem: LadderItem, teamType: TeamType) {
    if (ladderItem.teamType === teamType) {
      return this.playerStyleService.getTeamBorderColor(this.game, teamType);
    } else {
      return '#ffffff';
    }
  }

  getIcon(ladderItem: LadderItem, teamType: TeamType): string {
    var icon = '';

    if (ladderItem.hasSeveralEvents(teamType)) {
      icon = 'assets/ic_list.png';
    } else if (ladderItem.hasSubstitutionEvents(teamType)) {
      icon = 'assets/ic_sub.png';
    } else if (ladderItem.hasTimeoutEvents(teamType)) {
      icon = 'assets/ic_timer.png';
    } else if (ladderItem.hasSanctionEvents(teamType)) {
      icon = 'assets/ic_expulsion_card.png';
    }

    return icon;
  }

  showEvents(ladderItem: LadderItem, teamType: TeamType): void {
    const data: LadderEventDialogData = {
      game: this.game,
      ladderItem: ladderItem,
      teamType: teamType,
    };

    const dialogRef = this.dialog.open(LadderEventDialogComponent, { data: data });
  }
}
