import { GameDescription } from '../model/game-description';
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
    return `/view/game/${this.gameDescription.id}`;
  }

  getLeagueUrl(): string {
    return `/view/league/${this.gameDescription.leagueId}`;
  }

  showLeague(): boolean {
    return !this.inLeague && this.gameDescription.leagueId && this.gameDescription.leagueId.length > 0;
  }

  showDivision(): boolean {
    return this.gameDescription.divisionName && this.gameDescription.divisionName.length > 0;
  }

  showReferee(): boolean {
    return this.gameDescription.refereeName && this.gameDescription.refereeName.length > 0;
  }

}
