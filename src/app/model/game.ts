import { Team } from './team';
import { Set } from './set';
import { Sanction } from './sanction';
import { Rules } from './rules';

export class Game {
  userId:   string;
  kind:     string;
  date:     number;
  schedule: number;
  gender:   string;
  usage:    string;
  status:   string;
  referee:  string;
  league:   string;
  hTeam:    Team;
  gTeam:    Team;
  hSets:    number;
  gSets:    number;
  sets:     Set[];
  hCards:   Sanction[];
  gCards:   Sanction[];
  rules:    Rules;
}
