import { User } from './user';
import { UUID } from 'angular2-uuid';

export class Rules {
  id:                               string;
  createdBy:                        string;
  createdAt:                        number;
  updatedAt:                        number;
  name:                             string;
  kind:                             string;
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

  public static createRules(user: User, kind: string): Rules {
    var rules: Rules;

    switch (kind) {
      case "INDOOR":
      rules = Rules.createIndoorRules(user);
      break;
      case "BEACH":
      rules = Rules.createBeachRules(user);
      break;
      case "INDOOR_4X4":
      rules = Rules.createIndoor4x4Rules(user);
      break;
    }

    return rules;
  }

  public static createIndoorRules(user: User): Rules {
    const rules = new Rules();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = new Date().getTime();
    rules.updatedAt = new Date().getTime();
    rules.name = '';
    rules.kind = 'INDOOR';
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
    rules.beachCourtSwitches = false;
    rules.beachCourtSwitchFreq = 0;
    rules.beachCourtSwitchFreqTieBreak = 0;
    rules.customConsecutiveServesPerPlayer = 9999;

    return rules;
  }

  public static createBeachRules(user: User): Rules {
    const rules = new Rules();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = new Date().getTime();
    rules.updatedAt = new Date().getTime();
    rules.name = '';
    rules.kind = 'BEACH';
    rules.setsPerGame = 3;
    rules.pointsPerSet = 21;
    rules.tieBreakInLastSet = true;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.teamTimeouts = true;
    rules.teamTimeoutsPerSet = 1;
    rules.teamTimeoutDuration = 30;
    rules.technicalTimeouts = true;
    rules.technicalTimeoutDuration = 30;
    rules.gameIntervals = true;
    rules.gameIntervalDuration = 60;
    rules.substitutionsLimitation = 1;
    rules.teamSubstitutionsPerSet = 9999;
    rules.beachCourtSwitches = true;
    rules.beachCourtSwitchFreq = 7;
    rules.beachCourtSwitchFreqTieBreak = 5;
    rules.customConsecutiveServesPerPlayer = 9999;

    return rules;
  }

  public static createIndoor4x4Rules(user: User): Rules {
    const rules = new Rules();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = new Date().getTime();
    rules.updatedAt = new Date().getTime();
    rules.name = '';
    rules.kind = 'INDOOR_4X4';
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
    rules.beachCourtSwitches = false;
    rules.beachCourtSwitchFreq = 0;
    rules.beachCourtSwitchFreqTieBreak = 0;
    rules.customConsecutiveServesPerPlayer = 9999;

    return rules;
  }

}
