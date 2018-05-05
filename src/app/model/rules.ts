import { UserId } from './userid';

export class Rules {
  userId:                           UserId;
  name:                             string;
  date:                             number;
  setsPerGame:                      number;
  pointsPerSet:                     number;
  tieBreakInLastSet:                boolean;
  pointsInTieBreak:                 number;
  twoPointsDifference:              boolean;
  sanctions:                        boolean;
  teamTimeouts:                     boolean;
  teamTimeoutsPerSet:               number;
  teamTimeoutDuration:              number;
  technicalTimeouts:                boolean;
  technicalTimeoutDuration:         number;
  gameIntervals:                    boolean;
  gameIntervalDuration:             number;
  teamSubstitutionsPerSet:          number;
  changeSidesBeach:                 boolean;
  changeSidesPeriod:                number;
  changeSidesPeriodTieBreak:        number;
  customConsecutiveServesPerPlayer: number;
}
