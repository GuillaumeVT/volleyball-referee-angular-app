import { Injectable } from '@angular/core';
import { Game } from '@shared/models/game.model';
import { TeamType } from '@shared/models/team-type.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerStyleService {
  constructor() {}

  public isLibero(game: Game, teamType: TeamType, player: number): boolean {
    var liberos = [];

    if (TeamType.Home === teamType) {
      liberos = game.homeTeam.liberos;
    } else {
      liberos = game.guestTeam.liberos;
    }

    for (let libero of liberos) {
      if (libero.num === player) {
        return true;
      }
    }

    return false;
  }

  public getPlayer(game: Game, teamType: TeamType, player: number): string {
    var captain: number;

    if (TeamType.Home === teamType) {
      captain = game.homeTeam.captain;
    } else {
      captain = game.guestTeam.captain;
    }

    var playerStr = String(player);

    if (player === captain) {
      playerStr = '<u>' + playerStr + '</u>';
    }

    return playerStr;
  }

  public getTeamBackgroundColor(game: Game, teamType: TeamType): string {
    var color: string;

    switch (teamType) {
      case TeamType.Home:
        color = game.homeTeam.color;
        break;
      case TeamType.Guest:
        color = game.guestTeam.color;
        break;
    }

    return color;
  }

  public getLiberoBackgroundColor(game: Game, teamType: TeamType): string {
    var color: string;

    switch (teamType) {
      case TeamType.Home:
        color = game.homeTeam.liberoColor;
        break;
      case TeamType.Guest:
        color = game.guestTeam.liberoColor;
        break;
    }

    return color;
  }

  public getTeamTextColor(game: Game, teamType: TeamType): string {
    var backgroundColor = this.getTeamBackgroundColor(game, teamType);
    return this.getTextColor(backgroundColor);
  }

  public getTeamBorderColor(game: Game, teamType: TeamType): string {
    var backgroundColor = this.getTeamBackgroundColor(game, teamType);
    return this.getBorderColor(backgroundColor);
  }

  public getLiberoTextColor(game: Game, teamType: TeamType): string {
    var backgroundColor = this.getLiberoBackgroundColor(game, teamType);
    return this.getTextColor(backgroundColor);
  }

  public getLiberoBorderColor(game: Game, teamType: TeamType): string {
    var backgroundColor = this.getLiberoBackgroundColor(game, teamType);
    return this.getBorderColor(backgroundColor);
  }

  public getPlayerBackgroundColor(game: Game, teamType: TeamType, player: number): string {
    if (this.isLibero(game, teamType, player)) {
      return this.getLiberoBackgroundColor(game, teamType);
    } else {
      return this.getTeamBackgroundColor(game, teamType);
    }
  }

  public getPlayerTextColor(game: Game, teamType: TeamType, player: number): string {
    if (this.isLibero(game, teamType, player)) {
      return this.getLiberoTextColor(game, teamType);
    } else {
      return this.getTeamTextColor(game, teamType);
    }
  }

  public getPlayerBorderColor(game: Game, teamType: TeamType, player: number): string {
    if (this.isLibero(game, teamType, player)) {
      return this.getLiberoBorderColor(game, teamType);
    } else {
      return this.getTeamBorderColor(game, teamType);
    }
  }

  public getBorderColor(backgroundColor: string) {
    return backgroundColor === '#ffffff' ? '#1f1f1f' : backgroundColor;
  }

  public getTextColor(backgroundColor: string) {
    var hexColor = backgroundColor.substr(backgroundColor.indexOf('#') + 1);
    const red = parseInt(hexColor.substr(0, 2), 16);
    const green = parseInt(hexColor.substr(2, 2), 16);
    const blue = parseInt(hexColor.substr(4, 2), 16);

    const a = 1 - (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    var color: string;

    if (a < 0.5) {
      color = '#1f1f1f';
    } else {
      color = '#ffffff';
    }

    return color;
  }
}
