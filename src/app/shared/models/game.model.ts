import { UUID } from 'angular2-uuid';
import { Friend, UserSummary } from 'src/app/core/models/user.model';
import { LeagueSummary, SelectedLeague } from 'src/app/shared/models/league.model';
import { Rules, RulesSummary } from 'src/app/shared/models/rules.model';
import { Set } from 'src/app/shared/models/set.model';
import { Team, TeamSummary } from 'src/app/shared/models/team.model';

export class Game {
  id:          string;
  createdBy:   string;
  createdAt:   number;
  updatedAt:   number;
  scheduledAt: number;
  refereedBy:  string;
  refereeName: string;
  kind:        string;
  gender:      string;
  usage:       string;
  status:      string;
  indexed:     boolean;
  league:      SelectedLeague;
  homeTeam:    Team;
  guestTeam:   Team;
  homeSets:    number;
  guestSets:   number;
  sets:        Set[];
  homeCards:   Sanction[];
  guestCards:  Sanction[];
  rules:       Rules;
  score:       string;
  startTime:   number;
  endTime:     number;
  referee1:    string;
  referee2:    string;
  scorer:      string;
}

export class GameSummary {
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
  referee1Name:  string;
  referee2Name:  string;
  scorerName:    string;

  public static createGame(user: UserSummary, kind: string, league: LeagueSummary): GameSummary {
    const game = new GameSummary();
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
    } else {
      game.leagueId = '';
      game.leagueName = '';
    }
    game.divisionName = '';
    game.homeTeamId = '';
    game.homeTeamName = '';
    game.guestTeamId = '';
    game.guestTeamName = '';
    game.homeSets = 0;
    game.guestSets = 0;
    game.rulesId = '';
    game.rulesName = '';
    game.score = '';
    game.referee1Name = '';
    game.referee2Name = '';
    game.scorerName = '';

    return game;
  }

  public static copyGame(game: GameSummary): GameSummary {
    const copy = new GameSummary();

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
    copy.referee1Name = game.referee1Name;
    copy.referee2Name = game.referee2Name;
    copy.scorerName = game.scorerName;

    return copy;
  }
}

export class Sanction {
  card:        string;
  num:         number;
  set:         number;
  homePoints:  number;
  guestPoints: number;
}

export class GameIngredients {
  kind:         string;
  friends:      Friend[];
  defaultRules: RulesSummary;
  rules:        RulesSummary[];
  teams:        TeamSummary[];
  leagues:      LeagueSummary[];
}
