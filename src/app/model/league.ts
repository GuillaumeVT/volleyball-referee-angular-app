import { User } from './user';
import { UUID } from 'angular2-uuid';

export class League {
  id:        string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  kind:      string;
  name:      string;
  divisions: string[];

  public static createLeague(user: User, kind: string): League {
    const league = new League();
    const now = new Date();

    league.id = UUID.UUID();
    league.createdBy = user.id;
    league.createdAt = now.getTime() + (now.getTimezoneOffset() * 60000);
    league.updatedAt = now.getTime() + (now.getTimezoneOffset() * 60000);
    league.kind = kind;
    league.name = '';
    league.divisions = [];

    return league;
  }
}
