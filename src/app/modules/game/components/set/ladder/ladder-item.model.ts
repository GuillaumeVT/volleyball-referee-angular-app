import { Sanction } from '@shared/models/game.model';
import { Substitution, Timeout } from '@shared/models/set.model';
import { TeamType } from '@shared/models/team-type.model';

export class LadderItem {
  teamType: TeamType;
  score: number;
  oScore: number;
  substitutions: Substitution[];
  oSubstitutions: Substitution[];
  timeouts: Timeout[];
  oTimeouts: Timeout[];
  sanctions: Sanction[];
  oSanctions: Sanction[];

  constructor(teamType: TeamType, score: number, otherScore: number) {
    this.teamType = teamType;
    this.score = score;
    this.oScore = otherScore;
    this.substitutions = [];
    this.timeouts = [];
    this.sanctions = [];
    this.oSubstitutions = [];
    this.oTimeouts = [];
    this.oSanctions = [];
  }

  addSubstitution(teamType: TeamType, substitution: Substitution): void {
    if (teamType === this.teamType) {
      this.substitutions.push(substitution);
    } else {
      this.oSubstitutions.push(substitution);
    }
  }

  addTimeout(teamType: TeamType, timeout: Timeout): void {
    if (teamType === this.teamType) {
      this.timeouts.push(timeout);
    } else {
      this.oTimeouts.push(timeout);
    }
  }

  addSanction(teamType: TeamType, sanction: Sanction): void {
    if (teamType === this.teamType) {
      this.sanctions.push(sanction);
    } else {
      this.oSanctions.push(sanction);
    }
  }

  hasSubstitutionEvents(teamType: TeamType): boolean {
    if (teamType === this.teamType) {
      return this.substitutions.length > 0;
    } else {
      return this.oSubstitutions.length > 0;
    }
  }

  hasTimeoutEvents(teamType: TeamType): boolean {
    if (teamType === this.teamType) {
      return this.timeouts.length > 0;
    } else {
      return this.oTimeouts.length > 0;
    }
  }

  hasSanctionEvents(teamType: TeamType): boolean {
    if (teamType === this.teamType) {
      return this.sanctions.length > 0;
    } else {
      return this.oSanctions.length > 0;
    }
  }

  hasEvent(teamType: TeamType): boolean {
    return this.hasSubstitutionEvents(teamType) || this.hasTimeoutEvents(teamType) || this.hasSanctionEvents(teamType);
  }

  hasSeveralEvents(teamType: TeamType): boolean {
    var count = 0;

    if (this.hasSubstitutionEvents(teamType)) {
      count++;
    }
    if (this.hasTimeoutEvents(teamType)) {
      count++;
    }
    if (this.hasSanctionEvents(teamType)) {
      count++;
    }

    return count > 1;
  }
}
