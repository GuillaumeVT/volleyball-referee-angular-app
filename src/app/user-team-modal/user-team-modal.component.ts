import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../model/team';
import { CrudType } from '../model/crudtype';
import { InputPlayerItem } from '../model/input-player-item';
import { Utils } from '../utils/utils';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-team-modal',
  templateUrl: './user-team-modal.component.html',
  styleUrls: ['./user-team-modal.component.css']
})
export class UserTeamModalComponent implements OnInit, AfterViewInit {

  @Input() team:     Team;
  @Input() crudType: CrudType;
  @Output() teamUpdated = new EventEmitter();

  invalidName:      boolean;
  invalidResponse:  boolean;
  availablePlayers: number;
  invalidCaptain:   boolean;
  gender:           string;
  players:          InputPlayerItem[];
  liberos:          InputPlayerItem[];
  moreNumbers:      boolean;
  minPlayers:       number;

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private utils: Utils) {
    this.invalidName = false;
    this.invalidResponse =  false;
    this.invalidCaptain = false;
    this.availablePlayers = 6;

    this.gender = 'MIXED';
    this.moreNumbers = false;
    this.players = [];
    this.liberos = [];
    for (var index = 1; index <= 99; index++) {
      this.players.push(new InputPlayerItem(index, '#ffffff', '#000000', false, '#1f1f1f', '#d6d7d7'));
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.team && this.crudType) {
      switch  (this.team.kind) {
        case 'INDOOR':
          this.minPlayers = 6;
          break;
        case 'BEACH':
          this.minPlayers = 2;
          break;
        case 'INDOOR_4X4':
          this.minPlayers = 4;
          break;
      }

      this.initForm();
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    (<HTMLInputElement>document.getElementById('name')).value = this.team.name;
    (<HTMLInputElement>document.getElementById('shirt-color')).value = this.team.color;
    (<HTMLInputElement>document.getElementById('libero-shirt-color')).value = this.team.liberoColor;
    (<HTMLInputElement>document.getElementById('captain')).value = String(this.team.captain);

    this.onShirtColorChanged();
    this.onLiberoShirtColorChanged();

    setTimeout(() => this.initPlayersAndLiberos(), 0);
  }

  initPlayersAndLiberos(): void {
    this.gender = this.team.gender;

    for (let player of this.team.players) {
      this.onPlayerSelected(player);
    }

    for (let libero of this.team.liberos) {
      this.onLiberoSelected(libero);
    }
  }

  onSubmitForm(): void {
    const name = (<HTMLInputElement>document.getElementById('name')).value;

    if (name.length === 0) {
      this.invalidName = true;
    } else {
      this.invalidName = false;
    }

    const captain: number = Number((<HTMLInputElement>document.getElementById('captain')).value);
    if (this.players[captain-1].selected) {
      this.invalidCaptain = false;
    } else {
      this.invalidCaptain = true;
    }

    this.availablePlayers = this.numberOfPlayers() - this.numberOfLiberos();

    if (!this.invalidName && !this.invalidCaptain && this.availablePlayers >= this.minPlayers) {
      this.team.name = (<HTMLInputElement>document.getElementById('name')).value;
      this.team.date = new Date().getTime();
      this.team.gender = this.gender;
      this.team.color = (<HTMLInputElement>document.getElementById('shirt-color')).value;
      this.team.liberoColor = (<HTMLInputElement>document.getElementById('libero-shirt-color')).value;
      this.team.captain = captain;
      this.team.players = [];
      this.team.liberos = [];

      for (let playerItem of this.players) {
        if (playerItem.selected) {
          this.team.players.push(playerItem.shirtNumber);
        }
      }

      for (let liberoItem of this.liberos) {
        if (liberoItem.selected) {
          this.team.liberos.push(liberoItem.shirtNumber);
        }
      }

      if (this.crudType === CrudType.Create) {
        this.userService.createTeam(this.team).subscribe(team => this.onValidResponse(), error => this.onInvalidResponse(error));
      } else if (this.crudType === CrudType.Update) {
        this.userService.updateTeam(this.team).subscribe(team => this.onValidResponse(), error => this.onInvalidResponse(error));
      }
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.teamUpdated.emit(true);
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

  onShirtColorChanged(): void {
    const backgroundColor: string = (<HTMLInputElement>document.getElementById('shirt-color')).value;
    const color: string = this.utils.getTextColor(backgroundColor);
    for (let playerItem of this.players) {
      playerItem.backgroundColor = backgroundColor;
      playerItem.color = color;
    }
  }

  onLiberoShirtColorChanged(): void {
    const backgroundColor: string = (<HTMLInputElement>document.getElementById('libero-shirt-color')).value;
    const color: string = this.utils.getTextColor(backgroundColor);
    for (let liberoItem of this.liberos) {
      liberoItem.backgroundColor = backgroundColor;
      liberoItem.color = color;
    }
  }

  onPlayerSelected(player: number) {
    const playerItem = this.players[player-1];
    playerItem.selected = !playerItem.selected;

    if (playerItem.selected) {
      const backgroundColor: string = (<HTMLInputElement>document.getElementById('libero-shirt-color')).value;
      const color: string = this.utils.getTextColor(backgroundColor);
      this.liberos.push(new InputPlayerItem(player, color, backgroundColor, playerItem.captain, '#1f1f1f', '#d6d7d7'));
      this.liberos = this.liberos.sort((l1, l2) => l1.shirtNumber - l2.shirtNumber);
    } else {
      var tmpLiberos = [];

      for (let liberoItem of this.liberos) {
        if (liberoItem.shirtNumber !== player) {
          tmpLiberos.push(liberoItem);
        }
      }

      this.liberos = tmpLiberos.sort((l1, l2) => l1.shirtNumber - l2.shirtNumber);
    }
  }

  onLiberoSelected(player: number) {
    const numberOfLiberos = this.numberOfLiberos();
    for (let liberoItem of this.liberos) {
      if (liberoItem.shirtNumber === player) {
        if (liberoItem.selected || (numberOfLiberos < 2)) {
          liberoItem.selected = !liberoItem.selected;
        }
      }
    }
  }

  numberOfPlayers(): number {
    var count = 0;
    for (let playerItem of this.players) {
      if (playerItem.selected) {
        count++;
      }
    }
    return count;
  }

  numberOfLiberos(): number {
    var count = 0;
    for (let liberoItem of this.liberos) {
      if (liberoItem.selected) {
        count++;
      }
    }
    return count;
  }

  showMoreNumbers(): void {
    this.moreNumbers = true;
  }

}
