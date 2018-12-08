import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rules } from '../model/rules';
import { Team } from '../model/team';
import { League } from '../model/league';
import { GameDescription } from '../model/gamedescription';
import { CrudType } from '../model/crudtype';
import { Utils } from '../utils/utils';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-game-modal',
  templateUrl: './user-game-modal.component.html',
  styleUrls: ['./user-game-modal.component.css']
})
export class UserGameModalComponent implements OnInit {

  @Input() game:         GameDescription;
  @Input() crudType:     CrudType;
  @Input() rules:        Rules[];
  @Input() defaultRules: Rules[];
  @Input() teams:        Team[];
  @Input() leagues:      League[];
  @Input() divisions:    string[];
  @Output() gameUpdated = new EventEmitter();

  invalidGender:    boolean;
  invalidTeams:     boolean;
  invalidHTeam:     boolean;
  invalidGTeam:     boolean;
  invalidRules:     boolean;
  invalidResponse:  boolean;

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private utils: Utils, private datePipe: DatePipe) {
    this.invalidGender = false;
    this.invalidTeams = false;
    this.invalidHTeam = false;
    this.invalidGTeam = false;
    this.invalidRules = false;
    this.invalidResponse = false;
  }

  ngOnInit() {
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmitForm(): void {
    const schedule: number = new Date((<HTMLInputElement>document.getElementById('schedule')).value).getTime();
    const indexed: boolean = (<HTMLInputElement>document.getElementById('public')).checked;
    const league: string = (<HTMLInputElement>document.getElementById('league')).value;
    const division: string = (<HTMLInputElement>document.getElementById('division')).value;
    const hName: string = (<HTMLInputElement>document.getElementById('hTeam')).value;
    const gName: string = (<HTMLInputElement>document.getElementById('gTeam')).value;
    const rules: string = (<HTMLInputElement>document.getElementById('rules')).value;
    const referee: string = (<HTMLInputElement>document.getElementById('referee')).value;

    if (hName.length === 0) {
      this.invalidHTeam = true;
    } else {
      this.invalidHTeam = false;
    }

    if (gName.length === 0) {
      this.invalidGTeam = true;
    } else {
      this.invalidGTeam = false;
    }

    if (rules.length === 0) {
      this.invalidRules = true;
    } else {
      this.invalidRules = false;
    }

     if (hName === gName) {
       this.invalidTeams = true;
     } else {
       this.invalidTeams = false;
     }

    if (!this.invalidHTeam && !this.invalidGTeam && !this.invalidTeams) {
      var hTeam: Team;
      var gTeam: Team;

      for (let team of this.teams) {
        if (team.name === hName && team.gender === this.game.gender) {
          hTeam = team;
        } else if (team.name === gName && team.gender === this.game.gender) {
          gTeam = team;
        }
      }

      if (hTeam && gTeam) {
        this.invalidGender = false;
      } else {
        this.invalidGender = true;
      }
    }

    if (!this.invalidGender && !this.invalidHTeam && !this.invalidGTeam && !this.invalidRules && !this.invalidTeams) {
      if (this.crudType === CrudType.Create) {
        this.userService.createGame(this.game).subscribe(game => this.onValidResponse(), error => this.onInvalidResponse(error));
      } else if (this.crudType === CrudType.Update) {
        this.userService.updateGame(this.game).subscribe(game => this.onValidResponse(), error => this.onInvalidResponse(error));
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
