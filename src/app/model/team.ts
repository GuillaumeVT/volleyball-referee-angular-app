import { User } from './user';
import { UUID } from 'angular2-uuid';
import { Player } from './player';

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

  public static createTeam(user: User, kind: string): Team {
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

    if (team.kind === 'BEACH') {
      team.players.push(new Player(1, ""));
      team.players.push(new Player(2, ""));
    }

    return team;
  }

}
