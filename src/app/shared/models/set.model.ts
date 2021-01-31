export class Set {
  duration:             number;
  startTime:            number;
  endTime:              number;
  homePoints:           number;
  guestPoints:          number;
  homeTimeouts:         number;
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

export class Court {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  p6: number;
}

export class Substitution {
  playerIn:     number;
  playerOut:    number;
  homePoints:   number;
  guestPoints:  number;
}

export class Timeout {
  homePoints:  number;
  guestPoints: number;
}
