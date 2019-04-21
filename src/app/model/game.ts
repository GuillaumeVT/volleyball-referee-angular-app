import { Team } from './team';
import { Set } from './set';
import { Sanction } from './sanction';
import { Rules } from './rules';

export class Game {
  id:           string;
  createdBy:    string;
  createdAt:    number;
  updatedAt:    number;
  scheduledAt:  number;
  refereedBy:   string;
  refereeName:  string;
  kind:         string;
  gender:       string;
  usage:        string;
  status:       string;
  indexed:      boolean;
  leagueId:     string;
  leagueName:   string;
  divisionName: string;
  homeTeam:     Team;
  guestTeam:    Team;
  homeSets:     number;
  guestSets:    number;
  sets:         Set[];
  homeCards:    Sanction[];
  guestCards:   Sanction[];
  rules:        Rules;
  score:        string;
}
