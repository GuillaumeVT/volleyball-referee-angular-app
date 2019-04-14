import { Game } from '../model/game';
import { TeamType } from '../model/teamtype';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

export abstract class AbstractGameComponent implements OnInit {

  @Input() gameId:     string;
  @Input() game:       Game;
  @Input() currentSet: number;
  @Input() leftTeam:   TeamType;
  @Input() rightTeam:  TeamType;

  @Output() teamsSwapped = new EventEmitter();
  @Output() currentSetUpdated = new EventEmitter(true);

  constructor() { }

  ngOnInit() { }

  onCurrentSetUpdated(setIndex: number): void {
    this.currentSetUpdated.emit(setIndex);
  }

  onTeamsSwapped(): void {
    this.teamsSwapped.emit();
  }

}
