import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractGameFilter } from '@shared/models/abstract-game-filter.model';
import { GameSummary } from '@shared/models/game.model';
import { Page } from '@shared/models/page.model';
import { idAll } from '@shared/models/variable.model';
import { PublicService } from '@shared/services/public.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent extends AbstractGameFilter implements OnChanges {
  @Input() token: string;
  @Input() date: string;
  @Input() leagueId: string;
  @Input() teamId: string;
  @Input() live: boolean;

  searchResultMessage: string;
  inLeague: boolean;

  constructor(private publicService: PublicService, private translate: TranslateService) {
    super(20);
    this.searchResultMessage = '';
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.inLeague = this.leagueId !== undefined && this.leagueId !== null;
    this.refreshGames(false);
  }

  refreshGames(append: boolean): void {
    const pageToGet: number = append ? this.page : 0;

    if (this.token && this.token.length) {
      this.publicService
        .listGamesMatchingToken(this.token, this.getStatuses(), this.getKinds(), this.getGenders(), pageToGet, this.size)
        .subscribe(
          (page) => this.onGamesReceivedTokenCriterion(page),
          (_error) => this.onGamesReceivedTokenCriterion(null),
        );
    } else if (this.date && this.date.length) {
      this.publicService
        .listGamesWithScheduleDate(this.date, this.getStatuses(), this.getKinds(), this.getGenders(), pageToGet, this.size)
        .subscribe(
          (page) => this.onGamesReceivedDateCriterion(page),
          (_error) => this.onGamesReceivedDateCriterion(null),
        );
    } else if (this.leagueId && this.teamId) {
      if (this.teamId === idAll) {
        this.publicService.listGamesInLeague(this.leagueId, this.getStatuses(), this.getGenders(), pageToGet, this.size).subscribe(
          (page) => this.onGamesReceivedNoCriterion(page),
          (_error) => this.onGamesReceivedNoCriterion(null),
        );
      } else {
        this.publicService.listGamesOfTeamInLeague(this.leagueId, this.teamId, this.getStatuses(), pageToGet, this.size).subscribe(
          (page) => this.onGamesReceivedNoCriterion(page),
          (_error) => this.onGamesReceivedNoCriterion(null),
        );
      }
    } else if (this.live) {
      this.publicService.listLiveGames(this.getKinds(), this.getGenders(), pageToGet, this.size).subscribe(
        (page) => this.onGamesReceivedLiveCriterion(page),
        (_error) => this.onGamesReceivedLiveCriterion(null),
      );
    }
  }

  onGamesReceivedNoCriterion(page: Page<GameSummary>): void {
    this.onGamesReceived(page);
    this.translate.get('search.messages.found', { total: this.total }).subscribe((t) => (this.searchResultMessage = t));
  }

  onGamesReceivedTokenCriterion(page: Page<GameSummary>): void {
    this.onGamesReceived(page);
    this.translate
      .get('search.messages.found-token', { total: this.total, token: this.token })
      .subscribe((t) => (this.searchResultMessage = t));
  }

  onGamesReceivedDateCriterion(page: Page<GameSummary>): void {
    this.onGamesReceived(page);
    this.translate
      .get('search.messages.found-date', { total: this.total, date: this.date })
      .subscribe((t) => (this.searchResultMessage = t));
  }

  onGamesReceivedLiveCriterion(page: Page<GameSummary>): void {
    this.onGamesReceived(page);
    this.translate.get('search.messages.found-live', { total: this.total }).subscribe((t) => (this.searchResultMessage = t));
  }
}
