import { AbstractGameFilter } from 'src/app/shared/models/abstract-game-filter.model';
import { PublicService } from 'src/app/shared/services/public.service';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent extends AbstractGameFilter implements OnChanges {

  @Input() token:    string;
  @Input() date:     string;
  @Input() leagueId: string;
  @Input() teamId:   string;
  @Input() live:     boolean;

  searchCriterion: string;
  inLeague:        boolean;

  constructor(private publicService: PublicService) {
    super(20);
    this.searchCriterion = '';
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.inLeague = this.leagueId !== undefined && this.leagueId !== null;
    this.refreshGames(false);
  }

  refreshGames(append: boolean): void {
    const pageToGet: number = append ? this.page : 0;

    if (this.token && this.token.length) {
      this.searchCriterion = ` with '${this.token}'`;
      this.publicService.listGamesMatchingToken(this.token, this.getStatuses(), this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    } else if (this.date && this.date.length) {
      this.searchCriterion = ` on ${this.date}`;
      this.publicService.listGamesWithScheduleDate(this.date, this.getStatuses(), this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    } else if (this.leagueId && this.teamId) {
      this.searchCriterion = '';
      if (this.teamId === "All teams") {
        this.publicService.listGamesInLeague(this.leagueId, this.getStatuses(), this.getGenders(), pageToGet, this.size).subscribe(
          page => this.onGamesReceived(page),
          _error => this.onGamesReceived(null));
      } else {
        this.publicService.listGamesOfTeamInLeague(this.leagueId, this.teamId, this.getStatuses(), pageToGet, this.size).subscribe(
          page => this.onGamesReceived(page),
          _error => this.onGamesReceived(null));
      }
    } else if (this.live) {
      this.searchCriterion = ` live`;
      this.publicService.listLiveGames(this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    }
  }

}
