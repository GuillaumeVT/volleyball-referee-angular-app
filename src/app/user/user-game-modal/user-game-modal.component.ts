import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User, Friend } from '../../model/user';
import { GameDescription } from '../../model/game-description';
import { RulesDescription } from '../../model/rules-description';
import { TeamDescription } from '../../model/team-description';
import { League } from '../../model/league';
import { CrudType } from '../../model/crudtype';
import { Utils } from '../../utils/utils';
import { GameService } from '../../services/game.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-game-modal',
  templateUrl: './user-game-modal.component.html',
  styleUrls: ['./user-game-modal.component.css']
})
export class UserGameModalComponent implements OnInit, AfterViewInit {

  @Input() crudType:     CrudType;
  @Input() game:         GameDescription;
  @Input() rules:        RulesDescription[];
  @Input() defaultRules: RulesDescription;
  @Input() teams:        TeamDescription[];
  @Input() leagues:      League[];
  @Input() user:         User;
  @Output() gameUpdated = new EventEmitter();

  me: Friend;

  scheduleDate:     Date;
  minScheduleDate:  Date;
  selectedHTeam:    TeamDescription;
  selectedGTeam:    TeamDescription;
  selectedRules:    RulesDescription;
  selectedLeague:   League;
  selectedDivision: string;
  selectedReferee:  Friend;

  sameTeams:       boolean;
  undefinedHTeam:  boolean;
  undefinedGTeam:  boolean;
  invalidResponse: boolean;

  constructor(private activeModal: NgbActiveModal, private gameService: GameService, private utils: Utils, private datePipe: DatePipe) {
    this.sameTeams = false;
    this.undefinedHTeam = false;
    this.undefinedGTeam = false;
    this.invalidResponse = false;
    this.scheduleDate = new Date();
    this.minScheduleDate = new Date();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.game && this.crudType) {
      setTimeout(() => this.initForm(), 0);
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    this.scheduleDate = new Date(this.game.scheduledAt);
    this.me = new Friend(this.user.id, this.user.pseudo);
    this.selectedReferee = this.me;
    if (this.game.homeTeamId && this.game.guestTeamId) {
      for (let team of this.teams) {
        if (team.id === this.game.homeTeamId) {
          this.selectedHTeam = team;
        } else if (team.id === this.game.guestTeamId) {
          this.selectedGTeam = team;
        }
      }
    }
    if (this.game.leagueId) {
      for (let league of this.leagues) {
        if (league.id === this.game.leagueId) {
          this.selectedLeague = league;
        }
      }
    }
    if (this.game.rulesId) {
      if (this.defaultRules.id === this.game.rulesId) {
        this.selectedRules = this.defaultRules;
      } else {
        for (let aRules of this.rules) {
          if (aRules.id === this.game.rulesId) {
            this.selectedRules = aRules;
          }
        }
      }
    } else {
      this.selectedRules = this.defaultRules;
    }
  }

  onSubmitForm(): void {
    this.game.scheduledAt = this.scheduleDate.getTime();

    if (this.selectedHTeam.id.length === 0) {
      this.undefinedHTeam = true;
    } else {
      this.undefinedHTeam = false;
    }

    if (this.selectedGTeam.id.length === 0) {
      this.undefinedGTeam = true;
    } else {
      this.undefinedGTeam = false;
    }

     if (this.selectedHTeam.id === this.selectedGTeam.id) {
       this.sameTeams = true;
     } else {
       this.sameTeams = false;
     }

    if (!this.undefinedHTeam && !this.undefinedGTeam && !this.sameTeams) {
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

        if (this.selectedDivision) {
          this.game.divisionName = this.selectedDivision;
        }
      }

      if (this.crudType === CrudType.Create) {
        this.game.createdAt = new Date().getTime();
        this.game.updatedAt = new Date().getTime();
        this.gameService.createGame(this.game).subscribe(game => this.onValidResponse(), error => this.onInvalidResponse(error));
      } else if (this.crudType === CrudType.Update) {
        this.game.updatedAt = new Date().getTime();
        this.gameService.updateGame(this.game).subscribe(game => this.onValidResponse(), error => this.onInvalidResponse(error));
      }
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.gameUpdated.emit(true);
    this.close();
  }

  onInvalidResponse(error): void {
    this.invalidResponse = true;
  }

  isEditingDisabled(): boolean {
    return this.crudType === 4 ? true : null;
  }

  getGenderIcon(): string {
    if (this.game.gender === 'MIXED') {
      return 'fa fa-intersex';
    } else if (this.game.gender === 'LADIES') {
      return 'fa fa-venus';
    } else {
      return 'fa fa-mars';
    }
  }

  getGenderButton(): string {
    if (this.game.gender === 'MIXED') {
      return 'mixed-button';
    } else if (this.game.gender === 'LADIES') {
      return 'ladies-button';
    } else {
      return 'gents-button';
    }
  }

  nextGender(): void {
    if (this.game.gender === 'MIXED') {
      this.game.gender = 'LADIES';
    } else if (this.game.gender === 'LADIES') {
      this.game.gender = 'GENTS';
    } else {
      this.game.gender = 'MIXED';
    }
  }

}
