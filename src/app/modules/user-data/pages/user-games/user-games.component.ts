import { FileSaverService } from 'ngx-filesaver';
import { forkJoin, Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { GameRefereeModalComponent } from 'src/app/modules/user-data/components/game-referee-modal/game-referee-modal.component';
import { UserGameModalComponent } from 'src/app/modules/user-data/components/user-game-modal/user-game-modal.component';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { LeagueService } from 'src/app/modules/user-data/services/league.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractGameFilter } from 'src/app/shared/models/abstract-game-filter.model';
import { GameIngredients, GameSummary } from 'src/app/shared/models/game.model';
import { LeagueSummary } from 'src/app/shared/models/league.model';
import { PublicService } from 'src/app/shared/services/public.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent extends AbstractGameFilter implements OnInit, OnDestroy {

  user:             UserSummary;
  selectedLeagueId: string;
  selectedLeague:   LeagueSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private route: ActivatedRoute, private datePipe: DatePipe, private userService: UserService,
    private gameService: GameService, private leagueService: LeagueService, private publicService: PublicService, private dialog: MatDialog,
    private modalService: NgbModal, private snackBarService: SnackBarService, private fileSaverService: FileSaverService) {
    super(50);
    this.titleService.setTitle('VBR - My Games');
  }

  ngOnInit() {
    this.subscription.add(this.userService.authState.subscribe(userToken => {
      this.user = userToken.user;
      if (this.user) {
        this.selectedLeagueId = this.route.snapshot.paramMap.get('leagueId');
        this.refreshGames(false);
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshGames(append: boolean): void {
    if (this.selectedLeagueId) {
      forkJoin(
        this.leagueService.getLeague(this.selectedLeagueId),
        this.gameService.listGamesInLeague(this.selectedLeagueId, this.getStatuses(), this.getGenders(), (append ? this.page : 0), this.size)
      )
      .subscribe(([league, page]) => {
        this.selectedLeague = league;
        this.onGamesReceived(page);
      });
    } else {
      this.gameService.listGames(this.getStatuses(), this.getKinds(), this.getGenders(), (append ? this.page : 0), this.size).subscribe(
        page => this.onGamesReceived(page),
        _error => this.onGamesReceived(null));
    }
  }

  createGame(kind: string): void {
    const game = GameSummary.createGame(this.user, kind, this.selectedLeague);
    this.gameService.getGameIngredientsOfKind(game.kind).subscribe(gameIngredients => this.launchCreateGame(game, gameIngredients));
  }

  launchCreateGame(game: GameSummary, gameIngredients: GameIngredients): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.gameIngredients = gameIngredients;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.gameUpdated.subscribe((_updated: any) => this.onGameCreated());
  }

  viewGame(game: GameSummary): void {
    this.gameService.getGameIngredientsOfKind(game.kind).subscribe(gameIngredients => this.launchViewGame(game, gameIngredients));
  }

  launchViewGame(game: GameSummary, gameIngredients: GameIngredients): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.gameIngredients = gameIngredients;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.crudType = CrudType.View;
  }

  updateGame(game: GameSummary): void {
    const copy = GameSummary.copyGame(game);
    this.gameService.getGameIngredientsOfKind(game.kind).subscribe(gameIngredients => this.launchUpdateGame(copy, gameIngredients));
  }

  launchUpdateGame(game: GameSummary, gameIngredients: GameIngredients): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.gameIngredients = gameIngredients;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.crudType = CrudType.Update;
    modalRef.componentInstance.gameUpdated.subscribe((_updated: any) => this.onGameUpdated());
  }

  updateReferee(game: GameSummary): void {
    const modalRef = this.modalService.open(GameRefereeModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.refereeUpdated.subscribe((_updated: any) => this.onRefereeUpdated());
  }

  deleteGame(game: GameSummary): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete game', message: `Do you want to delete the game ${game.homeTeamName} - ${game.guestTeamName}?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.gameService.deleteGame(game.id).subscribe(_deleted => this.onGameDeleted(), _error => this.onGameDeletionError());
      }
    });
  }

  deleteAllGames(): void {
    let data;

    if (this.selectedLeagueId) {
      data = { title: `Delete ALL games in ${this.selectedLeague.name}`, message: `Do you want to delete ALL the games in ${this.selectedLeague.name}?` };
    } else {
      data = { title: 'Delete ALL games', message: 'Do you want to delete ALL the games?' };
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { width: "500px", data: data });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (this.selectedLeagueId) {
          this.gameService.deleteAllGamesInLeague(this.selectedLeagueId).subscribe(_deleted => this.onAllGamesDeleted());
        } else {
          this.gameService.deleteAllGames().subscribe(_deleted => this.onAllGamesDeleted());
        }
      }
    });
  }

  onGameCreated(): void {
    this.refreshGames(false);
    this.snackBarService.showInfo('Game was successfully created.');
  }

  onGameUpdated(): void {
    this.refreshGames(false);
    this.snackBarService.showInfo('Game was successfully updated.');
  }

  onRefereeUpdated(): void {
    this.refreshGames(false);
    this.snackBarService.showInfo('Referee was successfully updated.');
  }

  onGameDeleted(): void {
    this.refreshGames(false);
    this.snackBarService.showInfo('Game was successfully deleted.');
  }

  onAllGamesDeleted(): void {
    this.refreshGames(false);
    this.snackBarService.showInfo('All games was successfully deleted.');
  }

  onGameDeletionError(): void {
    this.snackBarService.showError('Game could not be deleted.');
  }

  getGamePublicUrl(game: GameSummary): string {
    return `/view/game/${game.id}`;
  }

  downloadScoreSheet(game: GameSummary): void {
    this.publicService.getScoreSheet(game.id).subscribe((blob: Blob) => this.onScoreSheetReceived(blob, game), error => this.onScoreSheetReceived(null, game));
  }

  onScoreSheetReceived(blob: Blob, game: GameSummary): void {
    const dateStr = this.datePipe.transform(game.scheduledAt, 'dd_MM_yyyy');
    const filename = game.homeTeamName + '_' + game.guestTeamName + '_' + dateStr + '.html';
    this.fileSaverService.save(blob, filename);
  }
}
