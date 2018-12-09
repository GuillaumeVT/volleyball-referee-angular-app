export class GameDescription {
  userId:   string;
  kind:     string;
  date:     number;
  schedule: number;
  gender:   string;
  usage:    string;
  status:   string;
  indexed:  boolean;
  referee:  string;
  league:   string;
  division: string;
  hName:    string;
  gName:    string;
  hSets:    number;
  gSets:    number;
  rules:    string;

  public static createGame(kind: string, league: string): GameDescription {
    const game = new GameDescription();

    game.userId = '';
    game.kind = kind;
    game.date = new Date().getTime();
    game.schedule = new Date().getTime();
    game.gender = 'MIXED';
    game.usage = 'NORMAL';
    game.status = 'SCHEDULED';
    game.indexed = true;
    game.referee = '';
    if (league) {
      game.league = league;
    } else {
      game.league = '';
    }
    game.division = '';
    game.hName = '';
    game.gName = '';
    game.hSets = 0;
    game.gSets = 0;
    game.rules = '';

    return game;
  }

  public static copyGame(game: GameDescription): GameDescription {
    const copy = new GameDescription();

    copy.userId = game.userId;
    copy.kind = game.kind;
    copy.date = game.date;
    copy.schedule = game.schedule;
    copy.gender = game.gender;
    copy.usage = game.usage;
    copy.status = game.status;
    copy.indexed = game.indexed;
    copy.referee = game.referee;
    copy.league = game.league;
    copy.division = game.division;
    copy.hName = game.hName;
    copy.gName = game.gName;
    copy.hSets = game.hSets;
    copy.gSets = game.gSets;
    copy.rules = game.rules;

    return copy;
  }
}
