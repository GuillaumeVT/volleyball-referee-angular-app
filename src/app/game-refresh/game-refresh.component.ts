import { Game } from '../model/game';
import { GameService } from '../game.service';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs }from 'file-saver';
import { AuthService } from '../auth.service';
import { SocialUser } from '../login/entities/user';

@Component({
  selector: 'app-game-refresh',
  templateUrl: './game-refresh.component.html',
  styleUrls: ['./game-refresh.component.css']
})
export class GameRefreshComponent implements OnInit, OnChanges, OnDestroy {

  @Input() date: number;
  @Output() currentGameUpdated = new EventEmitter();

  game:         Game;
  isLive:       boolean;
  subscription: Subscription;

  constructor(private router: Router, private gameService: GameService, private datePipe: DatePipe, private authService: AuthService) {
    this.isLive = true;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.date) {
      this.authService.authState.subscribe(user => {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = timer(0, user ? 20000 : 60000).pipe(takeWhile(() => this.isLive)).subscribe(() => this.updateGame());
      });
    }
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateGame(): void {
    this.gameService.getGame(this.date).subscribe(game => this.onGameReceived(game), error => this.onGameReceived(null));
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
    this.gameService.getScoreSheet(this.date).subscribe(response => this.onScoreSheetReceived(response), error => this.onScoreSheetReceived(null));
  }

  onScoreSheetReceived(response: HttpResponse<any>): void {
    const dateStr = this.datePipe.transform(this.game.schedule, 'dd_MM_yyyy');
    const filename = this.game.hTeam.name + '_' + this.game.gTeam.name + '_' + dateStr + '.html';
    const blob = new Blob([response.body], { type: 'html' });
    saveAs(response, filename);
  }

}
