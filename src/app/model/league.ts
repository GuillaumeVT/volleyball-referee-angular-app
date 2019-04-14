import { User } from './user';
import { UUID } from 'angular2-uuid';

export class League {
  id:        string;
  createdBy: string;
  createdAt: number;
  kind:      string;
  name:      string;
  divisions: string[];

  public static createLeague(user: User, kind: string): League {
    const league = new League();

    league.id = UUID.UUID();
    league.createdBy = user.id;
    league.createdAt = new Date().getTime();
    league.kind = kind;
    league.name = '';
    league.divisions = [];

    return league;
  }
}
