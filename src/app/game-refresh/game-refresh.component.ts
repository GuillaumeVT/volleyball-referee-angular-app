import { Game } from '../model/game';
import { PublicService } from '../public.service';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs }from 'file-saver';

@Component({
  selector: 'app-game-refresh',
  templateUrl: './game-refresh.component.html',
  styleUrls: ['./game-refresh.component.css']
})
export class GameRefreshComponent implements OnInit, OnChanges, OnDestroy {

  @Input() gameId: string;
  @Input() rate:   number;
  @Output() currentGameUpdated = new EventEmitter();

  game:         Game;
  isLive:       boolean;
  subscription: Subscription;

  constructor(private router: Router, private publicService: PublicService, private datePipe: DatePipe) {
    this.isLive = true;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gameId && this.rate) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, this.rate).pipe(takeWhile(() => this.isLive)).subscribe(() => this.updateGame());
    }
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateGame(): void {
    this.publicService.getGame(this.gameId).subscribe(game => this.onGameReceived(game), error => this.onGameReceived(null));
  }

  onGameReceived(game: Game): void {
    if (game === null) {
      this.router.navigateByUrl('not-found');
    } else {
      this.game = game;
      this.isLive = (game.status === 'LIVE');
      this.currentGameUpdated.emit(game);
    }
  }

  downloadScoreSheet(): void {
    this.publicService.getScoreSheet(this.gameId).subscribe(response => this.onScoreSheetReceived(response), error => this.onScoreSheetReceived(null));
  }

  onScoreSheetReceived(response: HttpResponse<any>): void {
    const dateStr = this.datePipe.transform(this.game.scheduledAt, 'dd_MM_yyyy');
    const filename = this.game.homeTeam.name + '_' + this.game.guestTeam.name + '_' + dateStr + '.html';
    const blob = new Blob([response.body], { type: 'html' });
    saveAs(response, filename);
  }

}
