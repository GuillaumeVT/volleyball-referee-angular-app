import { FileSaverService } from 'ngx-filesaver';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Game } from 'src/app/shared/models/game.model';
import { PublicService } from 'src/app/shared/services/public.service';

import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-refresh',
  templateUrl: './game-refresh.component.html',
  styleUrls: ['./game-refresh.component.scss']
})
export class GameRefreshComponent implements OnChanges, OnDestroy {

  @Input() gameId: string;
  @Input() rate:   number;
  @Output() currentGameUpdated = new EventEmitter();

  game:         Game;
  isLive:       boolean;
  subscription: Subscription;

  constructor(private router: Router, private publicService: PublicService, private fileSaverService: FileSaverService, private datePipe: DatePipe) {
    this.isLive = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gameId && this.rate) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, this.rate).pipe(takeWhile(() => this.isLive)).subscribe(() => this.updateGame());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateGame(): void {
    this.publicService.getGame(this.gameId).subscribe(game => this.onGameReceived(game), _error => this.onGameReceived(null));
  }

  onGameReceived(game: Game): void {
    if (game === null) {
      this.router.navigateByUrl('not-found');
    } else {
      this.game = game;
      this.isLive = (game.status === 'LIVE');
      if (this.game.homeTeam.color === this.game.guestTeam.color) {
        this.game.guestTeam.color = "#d6d7d7";
      }
      this.currentGameUpdated.emit(game);
    }
  }

  downloadScoreSheet(): void {
    this.publicService.getScoreSheet(this.gameId).subscribe((blob: Blob) => this.onScoreSheetReceived(blob), _error => this.onScoreSheetReceived(null));
  }

  onScoreSheetReceived(blob: Blob): void {
    const dateStr = this.datePipe.transform(this.game.scheduledAt, 'dd_MM_yyyy');
    const filename = this.game.homeTeam.name + '_' + this.game.guestTeam.name + '_' + dateStr + '.html';
    this.fileSaverService.save(blob, filename);
  }

}
