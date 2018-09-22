export class Rules {
  userId:                           string;
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
  substitutionsLimitation:                 number;   
  teamSubstitutionsPerSet:          number;
  beachCourtSwitches:               boolean;
  beachCourtSwitchFreq:             number;
  beachCourtSwitchFreqTieBreak:     number;
  customConsecutiveServesPerPlayer: number;
}
