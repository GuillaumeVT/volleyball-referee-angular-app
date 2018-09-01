import { GameDescription } from '../model/gamedescription';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent implements OnInit {

  @Input() gameDescription: GameDescription;
  @Input() inLeague:        boolean;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getMatchUrl(): string {
    return `/game/${this.gameDescription.date}`;
  }

  showLeague(): boolean {
    return !this.inLeague && this.gameDescription.league && this.gameDescription.league.length > 0;
  }

  showDivision(): boolean {
    return this.gameDescription.division && this.gameDescription.division.length > 0;
  }

  showReferee(): boolean {
    return this.gameDescription.referee && this.gameDescription.referee.length > 0;
  }

}
