import { User } from './user';
import { League } from './league';
import { UUID } from 'angular2-uuid';

export class GameDescription {
  id:            string;
  createdBy:     string;
  createdAt:     number;
  updatedAt:     number;
  scheduledAt:   number;
  refereedBy:    string;
  refereeName:   string;
  kind:          string;
  gender:        string;
  usage:         string;
  status:        string;
  indexed:       boolean;
  leagueId:      string;
  leagueName:    string;
  divisionName:  string;
  homeTeamId:    string;
  homeTeamName:  string;
  guestTeamId:   string;
  guestTeamName: string;
  homeSets:      number;
  guestSets:     number;
  rulesId:       string;
  rulesName:     string;
  score:         string;

  public static createGame(user: User, kind: string, league: League): GameDescription {
    const game = new GameDescription();
    const now = new Date();

    game.id = UUID.UUID();
    game.createdBy = user.id;
    game.createdAt = now.getTime() + (now.getTimezoneOffset() * 60000);
    game.updatedAt = now.getTime() + (now.getTimezoneOffset() * 60000);
    game.scheduledAt = now.getTime();
    game.refereedBy = user.id;
    game.refereeName = user.id;
    game.kind = kind;
    game.gender = 'MIXED';
    game.usage = 'NORMAL';
    game.status = 'SCHEDULED';
    game.indexed = true;
    if (league) {
      game.leagueId = league.id;
      game.leagueName = league.name;
      if (league.divisions.length > 0) {
        game.divisionName = league.divisions[0];
      } else {
        game.divisionName = '';
      }
    } else {
      game.leagueId = '';
      game.leagueName = '';
      game.divisionName = '';
    }
    game.homeTeamId = '';
    game.homeTeamName = '';
    game.guestTeamId = '';
    game.guestTeamName = '';
    game.homeSets = 0;
    game.guestSets = 0;
    game.rulesId = '';
    game.rulesName = '';
    game.score = '';

    return game;
  }

  public static copyGame(game: GameDescription): GameDescription {
    const copy = new GameDescription();

    copy.id = game.id;
    copy.createdBy = game.createdBy;
    copy.createdAt = game.createdAt;
    copy.updatedAt = game.updatedAt;
    copy.scheduledAt = game.scheduledAt;
    copy.refereedBy = game.refereedBy;
    copy.refereeName = game.refereeName;
    copy.kind = game.kind;
    copy.gender = game.gender;
    copy.usage = game.usage;
    copy.status = game.status;
    copy.indexed = game.indexed;
    copy.leagueId = game.leagueId;
    copy.leagueName = game.leagueName;
    copy.divisionName = game.divisionName;
    copy.homeTeamId = game.homeTeamId;
    copy.homeTeamName = game.homeTeamName;
    copy.guestTeamId = game.guestTeamId;
    copy.guestTeamName = game.guestTeamName;
    copy.homeSets = game.homeSets;
    copy.guestSets = game.guestSets;
    copy.rulesId = game.rulesId;
    copy.rulesName = game.rulesName;
    copy.score = game.score;

    return copy;
  }
}
