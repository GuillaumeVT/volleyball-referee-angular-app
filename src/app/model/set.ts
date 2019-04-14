import { Court } from './court';
import { Substitution } from './substitution';
import { Timeout } from './timeout';

export class Set {
  duration:              number;
  homePoints:            number;
  guestPoints:           number;
  homeTimeouts:          number;
  guestTimeouts:        number;
  ladder:               string[];
  serving:              string;
  firstServing:         string;
  homeCurrentPlayers:   Court;
  guestCurrentPlayers:  Court;
  homeStartingPlayers:  Court;
  guestStartingPlayers: Court;
  homeSubstitutions:    Substitution[];
  guestSubstitutions:   Substitution[];
  homeCaptain:          number;
  guestCaptain:         number;
  homeCalledTimeouts:   Timeout[];
  guestCalledTimeouts:  Timeout[];
  remainingTime:        number;
}
