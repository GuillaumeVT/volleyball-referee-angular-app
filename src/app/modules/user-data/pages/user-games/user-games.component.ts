import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractGameFilter } from '@shared/models/abstract-game-filter.model';
import { GameIngredients, GameSummary } from '@shared/models/game.model';
import { LeagueSummary } from '@shared/models/league.model';
import { FetchBehaviour, Paging } from '@shared/models/page.model';
import { PublicService } from '@shared/services/public.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import {
  GameRefereeDialogComponent,
  UserGameRefereeDialogData,
} from '@user-data/components/game-referee-dialog/game-referee-dialog.component';
import { UserGameDialogComponent, UserGameDialogData } from '@user-data/components/user-game-dialog/user-game-dialog.component';
import { CrudType } from '@user-data/models/crud-type.model';
import { GameService } from '@user-data/services/game.service';
import { LeagueService } from '@user-data/services/league.service';
import { saveAs } from 'file-saver';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss'],
})
export class UserGamesComponent extends AbstractGameFilter implements OnInit, OnDestroy {
  public user: UserSummary;
  private _selectedLeagueId: string;
  public selectedLeague: LeagueSummary;

  private _subscription: Subscription = new Subscription();

  fetchBehaviour = FetchBehaviour;

  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute,
    private _datePipe: DatePipe,
    private _userService: UserService,
    private _gameService: GameService,
    private _leagueService: LeagueService,
    private _publicService: PublicService,
    private _dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    super(50);
    this._translateService.get('user.game.page').subscribe((t) => this._titleService.setTitle(t));
  }

  ngOnInit(): void {
    this._subscription.add(
      this._userService.authState.subscribe((userToken) => {
        this.user = userToken.user;
        if (this.user) {
          this._selectedLeagueId = this._activatedRoute.snapshot.paramMap.get('leagueId');
          this.requestRefreshGames(FetchBehaviour.LOAD);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public refreshGames(paging: Paging): void {
    if (this._selectedLeagueId) {
      forkJoin([
        this._leagueService.getLeague(this._selectedLeagueId),
        this._gameService.listGamesInLeague(this._selectedLeagueId, this.getStatuses(), this.getGenders(), paging.page, paging.size),
      ]).subscribe(([league, page]) => {
        this.selectedLeague = league;
        this.onGamesReceived(page);
      });
    } else {
      this._gameService.listGames(this.getStatuses(), this.getKinds(), this.getGenders(), paging.page, paging.size).subscribe({
        next: (page) => this.onGamesReceived(page),
        error: (_) => this.onGamesReceived(null),
      });
    }
  }

  public createGame(kind: string): void {
    const game = GameSummary.createGame(this.user, kind, this.selectedLeague);
    this._gameService.getGameIngredientsOfKind(game.kind).subscribe((gameIngredients) => this.launchCreateGame(game, gameIngredients));
  }

  private launchCreateGame(game: GameSummary, gameIngredients: GameIngredients): void {
    const data: UserGameDialogData = {
      crudType: CrudType.Create,
      game: game,
      gameIngredients: gameIngredients,
      user: this.user,
    };

    const dialogRef = this._dialog.open(UserGameDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onGameCreated();
      }
    });
  }

  public viewGame(game: GameSummary): void {
    this._gameService.getGameIngredientsOfKind(game.kind).subscribe((gameIngredients) => this.launchViewGame(game, gameIngredients));
  }

  private launchViewGame(game: GameSummary, gameIngredients: GameIngredients): void {
    const data: UserGameDialogData = {
      crudType: CrudType.View,
      game: game,
      gameIngredients: gameIngredients,
      user: this.user,
    };

    const dialogRef = this._dialog.open(UserGameDialogComponent, { width: '800px', data: data });
  }

  public updateGame(game: GameSummary): void {
    const copy = GameSummary.copyGame(game);
    this._gameService.getGameIngredientsOfKind(game.kind).subscribe((gameIngredients) => this.launchUpdateGame(copy, gameIngredients));
  }

  private launchUpdateGame(game: GameSummary, gameIngredients: GameIngredients): void {
    const data: UserGameDialogData = {
      crudType: CrudType.Update,
      game: game,
      gameIngredients: gameIngredients,
      user: this.user,
    };

    const dialogRef = this._dialog.open(UserGameDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onGameUpdated();
      }
    });
  }

  public updateReferee(game: GameSummary): void {
    const data: UserGameRefereeDialogData = {
      game: game,
      user: this.user,
    };

    const dialogRef = this._dialog.open(GameRefereeDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onRefereeUpdated();
      }
    });
  }

  public deleteGame(game: GameSummary): void {
    this._translateService
      .get(['user.game.delete', 'user.game.messages.delete-question'], { homeTeam: game.homeTeamName, guestTeam: game.guestTeamName })
      .subscribe((ts) => {
        const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
          width: '500px',
          data: { title: ts['user.game.delete'], message: ts['user.game.messages.delete-question'] },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this._gameService.deleteGame(game.id).subscribe({
              next: (_deleted) => this.onGameDeleted(),
              error: (_) => this.onGameDeletionError(),
            });
          }
        });
      });
  }

  public deleteAllGames(): void {
    if (this._selectedLeagueId) {
      this._translateService
        .get(['user.game.delete', 'user.game.messages.delete-all-in-question'], { league: this.selectedLeague.name })
        .subscribe((ts) => {
          const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            width: '500px',
            data: { title: ts['user.game.delete'], message: ts['user.game.messages.delete-all-in-question'] },
          });
          dialogRef.afterClosed().subscribe((dialogResult) => {
            if (dialogResult) {
              this._gameService.deleteAllGamesInLeague(this._selectedLeagueId).subscribe((_deleted) => this.onAllGamesDeleted());
            }
          });
        });
    } else {
      this._translateService.get(['user.game.delete', 'user.game.messages.delete-all-question']).subscribe((ts) => {
        const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
          width: '500px',
          data: { title: ts['user.game.delete'], message: ts['user.game.messages.delete-all-question'] },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this._gameService.deleteAllGames().subscribe((_deleted) => this.onAllGamesDeleted());
          }
        });
      });
    }
  }

  private onGameCreated(): void {
    this.requestRefreshGames(FetchBehaviour.LOAD);
  }

  private onGameUpdated(): void {
    this.requestRefreshGames(FetchBehaviour.REFRESH);
  }

  private onRefereeUpdated(): void {
    this.requestRefreshGames(FetchBehaviour.REFRESH);
  }

  private onGameDeleted(): void {
    this.requestRefreshGames(FetchBehaviour.REFRESH);
  }

  private onAllGamesDeleted(): void {
    this.requestRefreshGames(FetchBehaviour.LOAD);
  }

  private onGameDeletionError(): void {
    this._translateService.get('user.game.messages.deleted-error').subscribe((t) => this._snackBarService.showError(t));
  }

  public getGamePublicUrl(game: GameSummary): string {
    return `/view/game/${game.id}`;
  }

  public downloadScoreSheet(game: GameSummary): void {
    this._publicService.getScoreSheet(game.id).subscribe({
      next: (blob: Blob) => this.onScoreSheetReceived(blob, game),
      error: (_) => this.onScoreSheetReceived(null, game),
    });
  }

  private onScoreSheetReceived(blob: Blob, game: GameSummary): void {
    const dateStr = this._datePipe.transform(game.scheduledAt, 'dd_MM_yyyy');
    const filename = game.homeTeamName + '_' + game.guestTeamName + '_' + dateStr + '.html';
    saveAs(blob, filename);
  }
}
