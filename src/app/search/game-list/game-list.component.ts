import { PublicService } from '../../services/public.service';
import { AbstractGameFilter } from '../../utils/abstract-game-filter';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent extends AbstractGameFilter implements OnInit, OnChanges {

  @Input() token:    string;
  @Input() date:     string;
  @Input() leagueId: string;
  @Input() teamId:   string;
  @Input() live:     boolean;

  constructor(private publicService: PublicService) {
    super(20);
  }

  ngOnInit() { }

  ngOnChanges(_changes: SimpleChanges) {
    this.refreshGames(false);
  }

  refreshGames(append: boolean): void {
    const pageToGet: number = append ? this.page : 0;

    if (this.token && this.token.length) {
      this.publicService.listGamesMatchingToken(this.token, this.getStatuses(), this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    } else if (this.date && this.date.length) {
      this.publicService.listGamesWithScheduleDate(this.date, this.getStatuses(), this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    } else if (this.leagueId && this.teamId) {
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
      this.publicService.listLiveGames(this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    }
  }

}
