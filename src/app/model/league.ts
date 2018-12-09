export class League {
  userId:    string;
  name:      string;
  kind:      string;
  date:      number;
  divisions: string[];

  public static createLeague(kind: string): League {
    const league = new League();

    league.userId = '';
    league.kind = kind;
    league.date = new Date().getTime();
    league.name = '';
    league.divisions = [];

    return league;
  }
}
