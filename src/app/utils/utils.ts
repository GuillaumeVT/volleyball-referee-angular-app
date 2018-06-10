import { Game } from '../model/game';
import { GameDescription } from '../model/gamedescription';
import { Team } from '../model/team';
import { League } from '../model/league';
import { Rules } from '../model/rules';
import { TeamType } from '../model/teamtype';
import { Sanction } from '../model/sanction';
import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  constructor() {}

  isLibero(game: Game, teamType: TeamType, player: number) : boolean {
    var result = false;
    var liberos = [];

    if (TeamType.Home === teamType) {
      liberos = game.hTeam.liberos;
    } else {
      liberos = game.gTeam.liberos;
    }

    for (let libero of liberos) {
      if (libero === player) {
        result = true;
      }
    }

    return result;
  }

  getPlayer(game: Game, teamType: TeamType, player: number): string {
    var captain;

    if (TeamType.Home === teamType) {
      captain = game.hTeam.captain;
    } else {
      captain = game.gTeam.captain;
    }

    var playerStr = String(player);

    if (player === captain) {
      playerStr = '<u>' + playerStr + '</u>';
    }

    return playerStr;
  }

  getTeamBackgroundColor(game: Game, teamType: TeamType) {
    var color;

    switch (teamType) {
      case TeamType.Home:
        color = game.hTeam.color;
        break;
      case TeamType.Guest:
        color = game.gTeam.color;
        break;
    }

    return color;
  }

  getLiberoBackgroundColor(game: Game, teamType: TeamType) {
    var color;

    switch (teamType) {
      case TeamType.Home:
        color = game.hTeam.liberoColor;
        break;
      case TeamType.Guest:
        color = game.gTeam.liberoColor;
        break;
    }

    return color;
  }

  getTeamTextColor(game: Game, teamType: TeamType): string {
    var backgroundColor = this.getTeamBackgroundColor(game, teamType);
    return this.getTextColor(backgroundColor);
  }

  getLiberoTextColor(game: Game, teamType: TeamType): string {
    var backgroundColor = this.getLiberoBackgroundColor(game, teamType);
    return this.getTextColor(backgroundColor);
  }

  getPlayerBackgroundColor(game: Game, teamType: TeamType, player: number): string {
    if (this.isLibero(game, teamType, player)) {
      return this.getLiberoBackgroundColor(game, teamType);
    } else {
      return this.getTeamBackgroundColor(game, teamType);
    }
  }

  getPlayerTextColor(game: Game, teamType: TeamType, player: number): string {
    if (this.isLibero(game, teamType, player)) {
      return this.getLiberoTextColor(game, teamType);
    } else {
      return this.getTeamTextColor(game, teamType);
    }
  }

  getTextColor(backgroundColor: string) {
    var hexColor = backgroundColor.substr(backgroundColor.indexOf('#') + 1);
    const red = parseInt(hexColor.substr(0, 2), 16);
    const green = parseInt(hexColor.substr(2, 2), 16);
    const blue = parseInt(hexColor.substr(4, 2), 16);

    const a = 1 - ( 0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    var color;

    if (a < 0.5) {
      color = '#1f1f1f';
    } else {
      color = '#ffffff';
    }

    return color;
  }

  getSanctionIcon(sanction: Sanction): string {
    switch (sanction.card) {
      case "Y":
        return '../../assets/ic_yellow_card.png';
      case "R":
        return '../../assets/ic_red_card.png';
      case "RE":
        return '../../assets/ic_expulsion_card.png';
      case "RD":
        return '../../assets/ic_disqualification_card.png';
      case "DW":
        return '../../assets/ic_delay_warning.png';
      case "DP":
        return '../../assets/ic_delay_penalty.png';
    }
  }

  getPlayerForSanction(game: Game, teamType: TeamType, player: number): string {
    if (player > 0) {
      return this.getPlayer(game, teamType, player);
    } else if (player == 0) {
      // coach
      return 'C.';
    } else {
      // whole team (beach)
      return 'T.';
    }
  }

  getGenderIcon(gender: string): string {
    if (gender === 'MIXED') {
      return 'fa fa-intersex vbr-mixed-text';
    } else if (gender === 'LADIES') {
      return 'fa fa-venus vbr-ladies-text';
    } else {
      return 'fa fa-mars vbr-gents-text';
    }
  }

  getGenderNoIcon(gender: string): string {
    if (gender === 'MIXED') {
      return '(Mixed)';
    } else if (gender === 'LADIES') {
      return '(Ladies)';
    } else {
      return '(Gents)';
    }
  }

  sortGames(games: GameDescription[]): GameDescription[] {
    return games.sort((g1, g2) => g2.schedule - g1.schedule);
  }

  sortTeams(teams: Team[]): Team[] {
    return teams.sort((t1, t2) => (t1.name > t2.name) ? 1 : ((t2.name > t1.name) ? -1 : 0));
  }

  sortLeagues(leagues: League[]): League[] {
    return leagues.sort((l1, l2) => (l1.name > l2.name) ? 1 : ((l2.name > l1.name) ? -1 : 0));
  }

  sortRules(rules: Rules[]): Rules[] {
    return rules.sort((r1, r2) => (r1.name > r2.name) ? 1 : ((r2.name > r1.name) ? -1 : 0));
  }

}
