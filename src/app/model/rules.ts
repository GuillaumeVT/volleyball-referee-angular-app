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
  substitutionsLimitation:          number;
  teamSubstitutionsPerSet:          number;
  beachCourtSwitches:               boolean;
  beachCourtSwitchFreq:             number;
  beachCourtSwitchFreqTieBreak:     number;
  customConsecutiveServesPerPlayer: number;

  public static createRules(): Rules {
    const rules = new Rules();

    rules.userId = '';
    rules.name = '';
    rules.date = new Date().getTime();
    rules.setsPerGame = 5;
    rules.pointsPerSet = 25;
    rules.tieBreakInLastSet = true;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.teamTimeouts = true;
    rules.teamTimeoutsPerSet = 2;
    rules.teamTimeoutDuration = 30;
    rules.technicalTimeouts = true;
    rules.technicalTimeoutDuration = 60;
    rules.gameIntervals = true;
    rules.gameIntervalDuration = 180;
    rules.substitutionsLimitation = 1;
    rules.teamSubstitutionsPerSet = 6;
    rules.beachCourtSwitches = true;
    rules.beachCourtSwitchFreq = 7;
    rules.beachCourtSwitchFreqTieBreak = 5;
    rules.customConsecutiveServesPerPlayer = 9999;

    return rules;
  }

  public static copyRules(rules: Rules): Rules {
    const copy = new Rules();

    copy.userId = rules.userId;
    copy.name = rules.name;
    copy.date = rules.date;
    copy.setsPerGame = rules.setsPerGame;
    copy.pointsPerSet = rules.pointsPerSet;
    copy.tieBreakInLastSet = rules.tieBreakInLastSet;
    copy.pointsInTieBreak = rules.pointsInTieBreak;
    copy.twoPointsDifference = rules.twoPointsDifference;
    copy.sanctions = rules.sanctions;
    copy.teamTimeouts = rules.teamTimeouts;
    copy.teamTimeoutsPerSet = rules.teamTimeoutsPerSet;
    copy.teamTimeoutDuration = rules.teamTimeoutDuration;
    copy.technicalTimeouts = rules.technicalTimeouts;
    copy.technicalTimeoutDuration = rules.technicalTimeoutDuration;
    copy.gameIntervals = rules.gameIntervals;
    copy.gameIntervalDuration = rules.gameIntervalDuration;
    copy.substitutionsLimitation = rules.substitutionsLimitation;
    copy.teamSubstitutionsPerSet = rules.teamSubstitutionsPerSet;
    copy.beachCourtSwitches = rules.beachCourtSwitches;
    copy.beachCourtSwitchFreq = rules.beachCourtSwitchFreq;
    copy.beachCourtSwitchFreqTieBreak = rules.beachCourtSwitchFreqTieBreak;
    copy.customConsecutiveServesPerPlayer = rules.customConsecutiveServesPerPlayer;

    return copy;
  }
}
