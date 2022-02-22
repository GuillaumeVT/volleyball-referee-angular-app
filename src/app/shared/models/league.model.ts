import { UUID } from 'angular2-uuid';
import { UserSummary } from 'src/app/core/models/user.model';

export class League {
  id: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  kind: string;
  name: string;
  divisions: string[];

  public static createLeague(user: UserSummary, kind: string): League {
    const league = new League();
    const now = new Date();

    league.id = UUID.UUID();
    league.createdBy = user.id;
    league.createdAt = now.getTime() + now.getTimezoneOffset() * 60000;
    league.updatedAt = now.getTime() + now.getTimezoneOffset() * 60000;
    league.kind = kind;
    league.name = '';
    league.divisions = [];

    return league;
  }
}

export class LeagueSummary {
  id: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  kind: string;
}

export class SelectedLeague {
  id: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  kind: string;
  division: string;
}
