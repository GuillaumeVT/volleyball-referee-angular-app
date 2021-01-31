import { ColorPickerModalComponent } from 'src/app/modules/user-data/components/user-teams/color-picker-modal/color-picker-modal.component';
import { PlayerNamesModalComponent } from 'src/app/modules/user-data/components/user-teams/player-names-modal/player-names-modal.component';
import { InputPlayerItem } from 'src/app/modules/user-data/components/user-teams/user-team-modal/input-player-item.model';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { TeamService } from 'src/app/modules/user-data/services/team.service';
import { Player, Team } from 'src/app/shared/models/team.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-team-modal',
  templateUrl: './user-team-modal.component.html',
  styleUrls: ['./user-team-modal.component.css']
})
export class UserTeamModalComponent implements OnInit, AfterViewInit {

  @Input() team:     Team;
  @Input() crudType: CrudType;
  @Output() teamUpdated = new EventEmitter();

  undefinedName:    boolean;
  invalidResponse:  boolean;
  availablePlayers: number;
  invalidCaptain:   boolean;
  players:          InputPlayerItem[];
  liberos:          InputPlayerItem[];
  moreNumbers:      boolean;
  minPlayers:       number;
  selectedPlayers:  number[];

  constructor(private activeModal: NgbActiveModal, private teamService: TeamService, private modalService: NgbModal, public playerStyleService: PlayerStyleService) {
    this.undefinedName = false;
    this.invalidResponse =  false;
    this.invalidCaptain = false;
    this.availablePlayers = 6;

    this.moreNumbers = false;
    this.players = [];
    this.liberos = [];
    for (var index = 0; index <= 99; index++) {
      this.players.push(new InputPlayerItem(index, '#ffffff', '#000000', '#000000', false, '#1f1f1f', '#d6d7d7', '#d6d7d7'));
    }
    this.selectedPlayers = [];
  }

  ngOnInit() { }

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
          case 'SNOW':
            this.minPlayers = 3;
            break;
      }

      this.initForm();
    }
  }

  close(): void {
    this.activeModal.close();
  }

  initForm(): void {
    this.onShirtColorChanged(this.team.color);
    this.onLiberoShirtColorChanged(this.team.liberoColor);

    setTimeout(() => this.initPlayersAndLiberos(), 0);
  }

  initPlayersAndLiberos(): void {
    for (let player of this.team.players) {
      this.onPlayerSelected(player.num, false);
    }

    for (let libero of this.team.liberos) {
      this.onLiberoSelected(libero.num, false);
    }
  }

  onSubmitForm(): void {
    if (this.team.name.length === 0) {
      this.undefinedName = true;
    } else {
      this.undefinedName = false;
    }

    if (this.players[this.team.captain].selected) {
      this.invalidCaptain = false;
    } else {
      this.invalidCaptain = true;
    }

    this.availablePlayers = this.numberOfPlayers() - this.numberOfLiberos();

    if (!this.undefinedName && !this.invalidCaptain && this.availablePlayers >= this.minPlayers) {
      this.team.players = this.team.players.sort((p1, p2) => p1.num - p2.num);
      this.team.liberos = this.team.liberos.sort((l1, l2) => l1.num - l2.num);

      if (this.crudType === CrudType.Create) {
        this.teamService.createTeam(this.team).subscribe(_team => this.onValidResponse(), _error => this.onInvalidResponse());
      } else if (this.crudType === CrudType.Update) {
        this.teamService.updateTeam(this.team).subscribe(_team => this.onValidResponse(), _error => this.onInvalidResponse());
      }
    }
  }

  onValidResponse(): void {
    this.invalidResponse = false;
    this.teamUpdated.emit(true);
    this.close();
  }

  onInvalidResponse(): void {
    this.invalidResponse = true;
  }

  isEditingDisabled(): boolean {
    return this.crudType === 4 ? true : null;
  }

  getGenderIcon(): string {
    if (this.team.gender === 'MIXED') {
      return 'fa fa-intersex';
    } else if (this.team.gender === 'LADIES') {
      return 'fa fa-venus';
    } else {
      return 'fa fa-mars';
    }
  }

  getGenderButton(): string {
    if (this.team.gender === 'MIXED') {
      return 'vbr-mixed-button';
    } else if (this.team.gender === 'LADIES') {
      return 'vbr-ladies-button';
    } else {
      return 'vbr-gents-button';
    }
  }

  nextGender(): void {
    if (this.team.gender === 'MIXED') {
      this.team.gender = 'LADIES';
    } else if (this.team.gender === 'LADIES') {
      this.team.gender = 'GENTS';
    } else {
      this.team.gender = 'MIXED';
    }
  }

  changeShirtColor(): void {
    const modalRef = this.modalService.open(ColorPickerModalComponent, { size: 'lg' });
    modalRef.componentInstance.selectedColor = this.team.color;
    modalRef.componentInstance.okClicked.subscribe((color: string) => this.onShirtColorChanged(color));
  }

  onShirtColorChanged(color: string): void {
    this.team.color = color;
    const textColor: string = this.playerStyleService.getTextColor(this.team.color);
    const borderColor: string = this.playerStyleService.getBorderColor(this.team.color);
    for (let playerItem of this.players) {
      playerItem.backgroundColor = this.team.color;
      playerItem.color = textColor;
      playerItem.borderColor = borderColor;
    }
  }

  changeLiberoShirtColor(): void {
    const modalRef = this.modalService.open(ColorPickerModalComponent, { size: 'lg' });
    modalRef.componentInstance.selectedColor = this.team.liberoColor;
    modalRef.componentInstance.okClicked.subscribe((color: string) => this.onLiberoShirtColorChanged(color));
  }

  onLiberoShirtColorChanged(color: string): void {
    this.team.liberoColor = color;
    const textColor: string = this.playerStyleService.getTextColor(this.team.liberoColor);
    const borderColor: string = this.playerStyleService.getBorderColor(this.team.liberoColor);
    for (let liberoItem of this.liberos) {
      liberoItem.backgroundColor = this.team.liberoColor;
      liberoItem.color = textColor;
      liberoItem.borderColor = borderColor;
    }
  }

  onPlayerSelected(player: number, andUpdateModel : boolean) {
    const playerItem = this.players[player];
    playerItem.selected = !playerItem.selected;

    if (playerItem.selected) {
      const color: string = this.playerStyleService.getTextColor(this.team.liberoColor);
      const borderColor: string = this.playerStyleService.getBorderColor(this.team.liberoColor);
      this.liberos.push(new InputPlayerItem(player, color, this.team.liberoColor, borderColor, playerItem.captain, '#1f1f1f', '#d6d7d7', '#d6d7d7'));
      this.liberos = this.liberos.sort((l1, l2) => l1.shirtNumber - l2.shirtNumber);
      this.selectedPlayers.push(player);
      this.selectedPlayers = this.selectedPlayers.sort((a, b) => a - b);
      if (andUpdateModel) {
        this.addPlayer(player);
      }
    } else {
      var tmpLiberos = [];

      for (let liberoItem of this.liberos) {
        if (liberoItem.shirtNumber !== player) {
          tmpLiberos.push(liberoItem);
        }
      }

      this.liberos = tmpLiberos.sort((l1, l2) => l1.shirtNumber - l2.shirtNumber);

      for (var index = 0; index < this.selectedPlayers.length; index++) {
        if (this.selectedPlayers[index] === player) {
          this.selectedPlayers.splice(index, 1);
        }
      }

      if (andUpdateModel) {
        this.removePlayer(player);
      }
    }
  }

  onLiberoSelected(player: number, andUpdateModel : boolean) {
    if (this.numberOfPlayers() > this.minPlayers) {
      const numberOfLiberos = this.numberOfLiberos();
      for (let liberoItem of this.liberos) {
        if (liberoItem.shirtNumber === player) {
          if (liberoItem.selected || (numberOfLiberos < 2)) {
            liberoItem.selected = !liberoItem.selected;
          }
          if (andUpdateModel) {
            if (liberoItem.selected) {
              this.addLibero(player);
            } else {
              this.removeLibero(player);
            }
          }
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

  addPlayer(player: number): void {
    this.team.players.push(new Player(player, ""));
  }

  removePlayer(player: number): void {
    for (var index = 0; index < this.team.players.length; index++) {
      if (this.team.players[index].num === player) {
        this.team.players.splice(index, 1);
      }
    }
    this.removeLibero(player);
  }

  addLibero(libero: number): void {
    for (let player of this.team.players) {
      if (player.num == libero) {
        this.team.liberos.push(player);
      }
    }
  }

  removeLibero(libero: number): void {
    for (var index = 0; index < this.team.liberos.length; index++) {
      if (this.team.liberos[index].num === libero) {
        this.team.liberos.splice(index, 1);
      }
    }
  }

  showMoreNumbers(): void {
    this.moreNumbers = true;
  }

  showLessNumbers(): void {
    this.moreNumbers = false;
  }

  showPlayerNamesInputModal(): void {
    this.team.players = this.team.players.sort((p1, p2) => p1.num - p2.num);
    const modalRef = this.modalService.open(PlayerNamesModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = this.team;
  }
}
