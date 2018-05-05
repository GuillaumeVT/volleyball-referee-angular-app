import { Player } from './player';
import { Substitution } from './substitution';
import { Timeout } from './timeout';

export class Set {
  duration:         number;
  hPoints:          number;
  gPoints:          number;
  hTimeouts:        number;
  gTimeouts:        number;
  ladder:           string[];
  serving:          string;
  hCurrentPlayers:  Player[];
  gCurrentPlayers:  Player[];
  hStartingPlayers: Player[];
  gStartingPlayers: Player[];
  hSubstitutions:   Substitution[];
  gSubstitutions:   Substitution[];
  hCaptain:         number;
  gCaptain:         number;
  hCalledTimeouts:  Timeout[];
  gCalledTimeouts:  Timeout[];
  rTime:            number;
}
