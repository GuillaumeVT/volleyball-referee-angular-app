import { UserSummary } from '@core/models/user.model';
import { UUID } from 'angular2-uuid';

export class Rules {
  id: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  kind: string;
  setsPerGame: number;
  pointsPerSet: number;
  tieBreakInLastSet: boolean;
  pointsInTieBreak: number;
  twoPointsDifference: boolean;
  sanctions: boolean;
  matchTermination: number;
  teamTimeouts: boolean;
  teamTimeoutsPerSet: number;
  teamTimeoutDuration: number;
  technicalTimeouts: boolean;
  technicalTimeoutDuration: number;
  gameIntervals: boolean;
  gameIntervalDuration: number;
  substitutionsLimitation: number;
  teamSubstitutionsPerSet: number;
  beachCourtSwitches: boolean;
  beachCourtSwitchFreq: number;
  beachCourtSwitchFreqTieBreak: number;
  customConsecutiveServesPerPlayer: number;

  public static createRules(user: UserSummary, kind: string): Rules {
    var rules: Rules;

    switch (kind) {
      case 'INDOOR':
        rules = Rules.createIndoorRules(user);
        break;
      case 'BEACH':
        rules = Rules.createBeachRules(user);
        break;
      case 'INDOOR_4X4':
        rules = Rules.createIndoor4x4Rules(user);
        break;
      case 'SNOW':
        rules = Rules.createSnowRules(user);
        break;
    }

    return rules;
  }

  public static createIndoorRules(user: UserSummary): Rules {
    const rules = new Rules();
    const now = new Date();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.updatedAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.name = '';
    rules.kind = 'INDOOR';
    rules.setsPerGame = 5;
    rules.pointsPerSet = 25;
    rules.tieBreakInLastSet = true;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.matchTermination = 1;
    rules.teamTimeouts = true;
    rules.teamTimeoutsPerSet = 2;
    rules.teamTimeoutDuration = 30;
    rules.technicalTimeouts = false;
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

  public static createBeachRules(user: UserSummary): Rules {
    const rules = new Rules();
    const now = new Date();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.updatedAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.name = '';
    rules.kind = 'BEACH';
    rules.setsPerGame = 3;
    rules.pointsPerSet = 21;
    rules.tieBreakInLastSet = true;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.matchTermination = 1;
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

  public static createIndoor4x4Rules(user: UserSummary): Rules {
    const rules = new Rules();
    const now = new Date();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.updatedAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.name = '';
    rules.kind = 'INDOOR_4X4';
    rules.setsPerGame = 5;
    rules.pointsPerSet = 25;
    rules.tieBreakInLastSet = true;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.matchTermination = 1;
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

  public static createSnowRules(user: UserSummary): Rules {
    const rules = new Rules();
    const now = new Date();

    rules.id = UUID.UUID();
    rules.createdBy = user.id;
    rules.createdAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.updatedAt = now.getTime() + now.getTimezoneOffset() * 60000;
    rules.name = '';
    rules.kind = 'SNOW';
    rules.setsPerGame = 3;
    rules.pointsPerSet = 15;
    rules.tieBreakInLastSet = false;
    rules.pointsInTieBreak = 15;
    rules.twoPointsDifference = true;
    rules.sanctions = true;
    rules.matchTermination = 1;
    rules.teamTimeouts = true;
    rules.teamTimeoutsPerSet = 1;
    rules.teamTimeoutDuration = 30;
    rules.technicalTimeouts = false;
    rules.technicalTimeoutDuration = 0;
    rules.gameIntervals = true;
    rules.gameIntervalDuration = 60;
    rules.substitutionsLimitation = 4;
    rules.teamSubstitutionsPerSet = 9999;
    rules.beachCourtSwitches = true;
    rules.beachCourtSwitchFreq = 5;
    rules.beachCourtSwitchFreqTieBreak = 5;
    rules.customConsecutiveServesPerPlayer = 9999;

    return rules;
  }
}

export interface RulesSummary {
  id: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  kind: string;
}
