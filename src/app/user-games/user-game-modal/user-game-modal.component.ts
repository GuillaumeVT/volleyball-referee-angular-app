import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSummary, Friend } from '../../model/user';
import { GameSummary, GameIngredients } from '../../model/game';
import { RulesSummary } from '../../model/rules';
import { TeamSummary } from '../../model/team';
import { LeagueSummary } from '../../model/league';
import { CrudType } from '../../model/crudtype';
import { Utils } from '../../utils/utils';
import { GameService } from '../../services/game.service';
import { LeagueService } from '../../services/league.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-game-modal',
  templateUrl: './user-game-modal.component.html',
  styleUrls: ['./user-game-modal.component.css']
})
export class UserGameModalComponent implements OnInit, AfterViewInit {

  @Input() crudType:        CrudType;
  @Input() game:            GameSummary;
  @Input() gameIngredients: GameIngredients;
  @Input() user:            UserSummary;
  @Output() gameUpdated = new EventEmitter();

  me: Friend;

  scheduleDate:              Date;
  minScheduleDate:           Date;
  selectedHTeam:             TeamSummary;
  selectedGTeam:             TeamSummary;
  selectedRules:             RulesSummary;
  selectedLeague:            LeagueSummary;
  divisionsOfSelectedLeague: string[];
  selectedDivision:          string;
  selectedReferee:           Friend;

  sameTeams:         boolean;
  undefinedHTeam:    boolean;
  undefinedGTeam:    boolean;
  undefinedDivision: boolean;
  invalidResponse:   boolean;

  constructor(private activeModal: NgbActiveModal, private gameService: GameService, private leagueService: LeagueService, public utils: Utils, public datePipe: DatePipe) {
    this.sameTeams = false;
    this.undefinedHTeam = false;
    this.undefinedGTeam = false;
    this.undefinedDivision = false;
    this.invalidResponse = false;
    this.scheduleDate = new Date();
    this.minScheduleDate = new Date();
    this.divisionsOfSelectedLeague = [];
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.game && this.gameIngredients && this.crudType) {
      setTimeout(() => this.initForm(), 0);
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    this.scheduleDate = new Date(this.game.scheduledAt);
    this.me = new Friend(this.user.id, this.user.pseudo);

    if (this.game.refereedBy === this.me.id) {
      this.selectedReferee = this.me;
    } else {
      for (let friend of this.gameIngredients.friends) {
        if (this.game.refereedBy === friend.id) {
          this.selectedReferee = friend;
        }
      }
    }

    if (this.game.homeTeamId && this.game.guestTeamId) {
      for (let team of this.gameIngredients.teams) {
        if (team.id === this.game.homeTeamId) {
          this.selectedHTeam = team;
        } else if (team.id === this.game.guestTeamId) {
          this.selectedGTeam = team;
        }
      }
    }
    if (this.game.leagueId) {
      for (let league of this.gameIngredients.leagues) {
        if (league.id === this.game.leagueId) {
          this.selectedLeague = league;
          this.refreshDivisionsOfSelectedLeague();
        }
      }
    }
    if (this.game.rulesId) {
      if (this.gameIngredients.defaultRules.id === this.game.rulesId) {
        this.selectedRules = this.gameIngredients.defaultRules;
      } else {
        for (let aRules of this.gameIngredients.rules) {
          if (aRules.id === this.game.rulesId) {
            this.selectedRules = aRules;
          }
        }
      }
    } else {
      this.selectedRules = this.gameIngredients.defaultRules;
    }
  }

  onSubmitForm(): void {
    this.game.scheduledAt = this.scheduleDate.getTime();

    if (!this.selectedHTeam || this.selectedHTeam.id.length === 0) {
      this.undefinedHTeam = true;
    } else {
      this.undefinedHTeam = false;
    }

    if (!this.selectedGTeam || this.selectedGTeam.id.length === 0) {
      this.undefinedGTeam = true;
    } else {
      this.undefinedGTeam = false;
    }

    if (this.selectedHTeam && this.selectedGTeam && this.selectedHTeam.id === this.selectedGTeam.id) {
      this.sameTeams = true;
    } else {
      this.sameTeams = false;
    }

    if (this.selectedLeague) {
      if (this.game.divisionName && this.game.divisionName.length > 0) {
        this.undefinedDivision = false;
      } else {
        this.undefinedDivision = true;
      }
    }

    if (!this.undefinedHTeam && !this.undefinedGTeam && !this.sameTeams && !this.undefinedDivision) {
      this.game.gender = this.selectedHTeam.gender === this.selectedGTeam.gender ? this.selectedHTeam.gender : 'MIXED';
      this.game.homeTeamId = this.selectedHTeam.id;
      this.game.homeTeamName = this.selectedHTeam.name;
      this.game.guestTeamId = this.selectedGTeam.id;
      this.game.guestTeamName = this.selectedGTeam.name;
      this.game.rulesId = this.selectedRules.id;
      this.game.rulesName = this.selectedRules.name;
      this.game.refereedBy = this.selectedReferee.id;
      this.game.refereeName = this.selectedReferee.pseudo;

      if (this.selectedLeague) {
        this.game.leagueId = this.selectedLeague.id;
        this.game.leagueName = this.selectedLeague.name;
      }

      if (this.crudType === CrudType.Create) {
        this.gameService.createGame(this.game).subscribe(_game => this.onValidResponse(), _error => this.onInvalidResponse());
      } else if (this.crudType === CrudType.Update) {
        this.gameService.updateGame(this.game).subscribe(_game => this.onValidResponse(), _error => this.onInvalidResponse());
      }
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.gameUpdated.emit(true);
    this.close();
  }

  onInvalidResponse(): void {
    this.invalidResponse = true;
  }

  isEditingDisabled(): boolean {
    return this.crudType === 4 ? true : null;
  }

  refreshDivisionsOfSelectedLeague(): void {
    if (this.selectedLeague) {
      this.leagueService.getLeague(this.selectedLeague.id).subscribe(
        league => this.divisionsOfSelectedLeague = league.divisions,
        _error => this.divisionsOfSelectedLeague = []);
    } else {
      this.divisionsOfSelectedLeague = [];
    }
  }

}
