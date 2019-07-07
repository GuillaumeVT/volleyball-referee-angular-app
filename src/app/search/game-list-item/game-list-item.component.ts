import { GameSummary } from '../../model/game';
import { Utils } from '../../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent implements OnInit {

  @Input() gameSummary: GameSummary;
  @Input() inLeague:        boolean;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getMatchUrl(): string {
    return `/view/game/${this.gameSummary.id}`;
  }

  getLeagueUrl(): string {
    return `/view/league/${this.gameSummary.leagueId}`;
  }

  getTokenUrl(): string {
    return `/search/token/${this.gameSummary.refereeName}`;
  }

  showLeague(): boolean {
    return !this.inLeague && this.gameSummary.leagueId && this.gameSummary.leagueId.length > 0;
  }

  showDivision(): boolean {
    return this.gameSummary.divisionName && this.gameSummary.divisionName.length > 0;
  }

  showReferee(): boolean {
    return this.gameSummary.refereeName && this.gameSummary.refereeName.length > 0;
  }

}
