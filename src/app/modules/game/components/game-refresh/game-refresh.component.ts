import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '@shared/models/game.model';
import { PublicService } from '@shared/services/public.service';
import { saveAs } from 'file-saver';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-game-refresh',
  templateUrl: './game-refresh.component.html',
  styleUrls: ['./game-refresh.component.scss'],
})
export class GameRefreshComponent implements OnChanges, OnDestroy {
  @Input() gameId: string;
  @Input() rate: number;
  @Output() currentGameUpdated = new EventEmitter();

  game: Game;
  isLive: boolean;
  subscription: Subscription;

  constructor(private router: Router, private publicService: PublicService, private datePipe: DatePipe) {
    this.isLive = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gameId && this.rate) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, this.rate)
        .pipe(takeWhile(() => this.isLive))
        .subscribe(() => this.updateGame());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateGame(): void {
    this.publicService.getGame(this.gameId).subscribe({
      next: (game) => this.onGameReceived(game),
      error: (_) => this.onGameReceived(null),
    });
  }

  onGameReceived(game: Game): void {
    if (game === null) {
      this.router.navigateByUrl('not-found');
    } else {
      this.game = game;
      this.isLive = game.status === 'LIVE';
      if (this.game.homeTeam.color === this.game.guestTeam.color) {
        this.game.guestTeam.color = '#d6d7d7';
      }
      this.currentGameUpdated.emit(game);
    }
  }

  downloadScoreSheet(): void {
    this.publicService.getScoreSheet(this.gameId).subscribe({
      next: (blob: Blob) => this.onScoreSheetReceived(blob),
      error: (_) => this.onScoreSheetReceived(null),
    });
  }

  onScoreSheetReceived(blob: Blob): void {
    const dateStr = this.datePipe.transform(this.game.scheduledAt, 'dd_MM_yyyy');
    const filename = this.game.homeTeam.name + '_' + this.game.guestTeam.name + '_' + dateStr + '.html';
    saveAs(blob, filename);
  }
}
