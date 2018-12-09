export class Team {
  userId:      string;
  name:        string;
  kind:        string;
  date:        number;
  gender:      string;
  color:       string;
  liberoColor: string;
  players:     number[];
  liberos:     number[];
  captain:     number;

  public static createTeam(kind: string): Team {
    const team = new Team();

    team.userId = '';
    team.name = '';
    team.kind = kind;
    team.date = new Date().getTime();
    team.gender = 'MIXED';
    team.color = '#034694';
    team.liberoColor = '#bc0019';
    team.players = [];
    team.liberos = [];
    team.captain = 1;

    if (team.kind === 'BEACH') {
      team.players.push(1);
      team.players.push(2);
    }

    return team;
  }

  public static copyTeam(team: Team): Team {
    const copy = new Team();

    copy.userId = team.userId;
    copy.name = team.name;
    copy.kind = team.kind;
    copy.date = team.date;
    copy.gender = team.gender;
    copy.color = team.color;
    copy.liberoColor = team.liberoColor;
    copy.players = Object.assign([], team.players);
    copy.liberos = Object.assign([], team.liberos);
    copy.captain = team.captain;

    return copy;
  }
}
