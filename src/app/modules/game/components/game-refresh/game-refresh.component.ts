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
  @Input() public gameId: string;
  @Input() public rate: number;
  @Output() public currentGameUpdated = new EventEmitter();

  public game: Game;
  private _isLive: boolean;
  private _subscription: Subscription;

  constructor(private _router: Router, private _publicService: PublicService, private _datePipe: DatePipe) {
    this._isLive = true;
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.gameId && this.rate) {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      this._subscription = timer(0, this.rate)
        .pipe(takeWhile(() => this._isLive))
        .subscribe(() => this.updateGame());
    }
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  public updateGame(): void {
    this._publicService.getGame(this.gameId).subscribe({
      next: (game) => this.onGameReceived(game),
      error: (_) => this.onGameReceived(null),
    });
  }

  private onGameReceived(game: Game): void {
    if (game === null) {
      this._router.navigateByUrl('not-found');
    } else {
      this.game = game;
      this._isLive = game.status === 'LIVE';
      if (this.game.homeTeam.color === this.game.guestTeam.color) {
        this.game.guestTeam.color = '#d6d7d7';
      }
      this.currentGameUpdated.emit(game);
    }
  }

  public downloadScoreSheet(): void {
    this._publicService.getScoreSheet(this.gameId).subscribe({
      next: (blob: Blob) => this.onScoreSheetReceived(blob),
      error: (_) => this.onScoreSheetReceived(null),
    });
  }

  private onScoreSheetReceived(blob: Blob): void {
    const dateStr = this._datePipe.transform(this.game.scheduledAt, 'dd_MM_yyyy');
    const filename = this.game.homeTeam.name + '_' + this.game.guestTeam.name + '_' + dateStr + '.html';
    saveAs(blob, filename);
  }
}
