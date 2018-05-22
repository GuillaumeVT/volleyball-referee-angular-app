import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
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
export class UserGameModalComponent implements OnInit, AfterViewInit {

  @Input() game:         GameDescription;
  @Input() crudType:     CrudType;
  @Input() rules:        Rules[];
  @Input() defaultRules: Rules[];
  @Input() teams:        Team[];
  @Input() leagues:      League[];
  @Input() divisions:    string[];
  @Output() gameUpdated = new EventEmitter();

  invalidGender:    boolean;
  invalidHTeam:     boolean;
  invalidGTeam:     boolean;
  invalidRules:     boolean;
  invalidResponse:  boolean;
  gender:           string;

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private utils: Utils, private datePipe: DatePipe) {
    this.invalidGender = false;
    this.invalidHTeam = false;
    this.invalidGTeam = false;
    this.invalidRules = false;
    this.invalidResponse = false;
    this.gender = 'MIXED';
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.game && this.crudType && this.rules && this.teams) {
      this.initForm();
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    (<HTMLInputElement>document.getElementById('schedule')).value =  this.datePipe.transform(this.game.schedule, 'yyyy-MM-ddTHH:mm');
    (<HTMLInputElement>document.getElementById('league')).value = this.game.league;
    (<HTMLInputElement>document.getElementById('division')).value = this.game.division;
    (<HTMLInputElement>document.getElementById('hTeam')).value = this.game.hName;
    (<HTMLInputElement>document.getElementById('gTeam')).value = this.game.gName;
    (<HTMLInputElement>document.getElementById('rules')).value = this.game.rules;
    (<HTMLInputElement>document.getElementById('referee')).value = this.game.referee;

    setTimeout(() => this.gender = this.game.gender, 0);
  }

  onSubmitForm(): void {
    const schedule: number = new Date((<HTMLInputElement>document.getElementById('schedule')).value).getTime();
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

    if (!this.invalidHTeam && !this.invalidGTeam) {
      var hTeam: Team;
      var gTeam: Team;

      for (let team of this.teams) {
        if (team.name === hName && team.gender === this.gender) {
          hTeam = team;
        } else if (team.name === gName && team.gender === this.gender) {
          gTeam = team;
        }
      }

      if (hTeam && gTeam) {
        this.invalidGender = false;
      } else {
        this.invalidGender = true;
      }
    }

    if (!this.invalidGender && !this.invalidHTeam && !this.invalidGTeam && !this.invalidRules) {
      this.game.schedule = schedule;
      this.game.league = league;
      this.game.division = division;
      this.game.gender = this.gender;
      this.game.hName = hName;
      this.game.gName = gName;
      this.game.rules = rules;
      this.game.referee = referee;

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

  getGenderIcon(): string {
    if (this.gender === 'MIXED') {
      return 'fa fa-intersex';
    } else if (this.gender === 'LADIES') {
      return 'fa fa-venus';
    } else {
      return 'fa fa-mars';
    }
  }

  getGenderButton(): string {
    if (this.gender === 'MIXED') {
      return 'mixed-button';
    } else if (this.gender === 'LADIES') {
      return 'ladies-button';
    } else {
      return 'gents-button';
    }
  }

  nextGender(): void {
    if (this.gender === 'MIXED') {
      this.gender = 'LADIES';
    } else if (this.gender === 'LADIES') {
      this.gender = 'GENTS';
    } else {
      this.gender = 'MIXED';
    }
  }

}
