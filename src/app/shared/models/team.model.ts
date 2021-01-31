import { UUID } from 'angular2-uuid';
import { UserSummary } from 'src/app/core/models/user.model';

export class Team {
  id:          string;
  createdBy:   string;
  createdAt:   number;
  updatedAt:   number;
  name:        string;
  kind:        string;
  gender:      string;
  color:       string;
  liberoColor: string;
  players:     Player[];
  liberos:     Player[];
  captain:     number;
  coach:       string;

  public static createTeam(user: UserSummary, kind: string): Team {
    const team = new Team();
    const now = new Date();

    team.id = UUID.UUID();
    team.createdBy = user.id;
    team.createdAt = now.getTime() + (now.getTimezoneOffset() * 60000);
    team.updatedAt = now.getTime() + (now.getTimezoneOffset() * 60000);
    team.name = '';
    team.kind = kind;
    team.gender = 'MIXED';
    team.color = '#034694';
    team.liberoColor = '#bc0019';
    team.players = [];
    team.liberos = [];
    team.captain = 1;
    team.coach = '';

    if (team.kind === 'BEACH') {
      team.players.push(new Player(1, ""));
      team.players.push(new Player(2, ""));
    }

    if (team.kind === 'SNOW') {
      team.players.push(new Player(1, ""));
      team.players.push(new Player(2, ""));
      team.players.push(new Player(3, ""));
    }

    return team;
  }

}

export class TeamSummary {
  id:           string;
  createdBy:    string;
  createdAt:    number;
  updatedAt:    number;
  name:         string;
  kind:         string;
  gender:       string;
}

export class Player {
  num:  number;
  name: string;

  constructor(num: number, name: string) {
    this.num = num;
    this.name = name;
  }
}
