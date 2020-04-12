import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameSummary, GameIngredients } from '../model/game';
import { CrudType } from '../model/crudtype';
import { AbstractGameFilter } from '../utils/abstract-game-filter';
import { UserSummary } from '../model/user';
import { LeagueSummary } from '../model/league';
import { UserService } from '../services/user.service';
import { GameService } from '../services/game.service';
import { LeagueService } from '../services/league.service';
import { PublicService } from '../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserGameModalComponent } from './user-game-modal/user-game-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { GameRefereeModalComponent } from './game-referee-modal/game-referee-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs }from 'file-saver';
import { Subscription, forkJoin } from 'rxjs';

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
    private gameService: GameService, private leagueService: LeagueService, private publicService: PublicService,
    private modalService: NgbModal, private toastr: ToastrService) {
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
    modalRef.componentInstance.gameUpdated.subscribe(_updated => this.onGameCreated());
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
    modalRef.componentInstance.gameUpdated.subscribe(_updated => this.onGameUpdated());
  }

  updateReferee(game: GameSummary): void {
    const modalRef = this.modalService.open(GameRefereeModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.refereeUpdated.subscribe(_updated => this.onRefereeUpdated());
  }

  deleteGame(game: GameSummary): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete game';
    modalRef.componentInstance.message = `Do you want to delete the game ${game.homeTeamName} - ${game.guestTeamName}?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.gameService.deleteGame(game.id).subscribe(_deleted => this.onGameDeleted(), _error => this.onGameDeletionError()));
  }

  deleteAllGames(): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });

    if (this.selectedLeagueId) {
      modalRef.componentInstance.title = `Delete ALL games in ${this.selectedLeague.name}`;
      modalRef.componentInstance.message = `Do you want to delete ALL the games in ${this.selectedLeague.name}?`;
      modalRef.componentInstance.okClicked.subscribe(_ok =>
        this.gameService.deleteAllGamesInLeague(this.selectedLeagueId).subscribe(_deleted => this.onAllGamesDeleted()));
    } else {
      modalRef.componentInstance.title = 'Delete ALL games';
      modalRef.componentInstance.message = 'Do you want to delete ALL the games?';
      modalRef.componentInstance.okClicked.subscribe(_ok =>
        this.gameService.deleteAllGames().subscribe(_deleted => this.onAllGamesDeleted()));
    }
  }

  onGameCreated(): void {
    this.refreshGames(false);
    this.toastr.success('Game was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onGameUpdated(): void {
    this.refreshGames(false);
    this.toastr.success('Game was successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRefereeUpdated(): void {
    this.refreshGames(false);
    this.toastr.success('Referee was successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onGameDeleted(): void {
    this.refreshGames(false);
    this.toastr.success('Game was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onAllGamesDeleted(): void {
    this.refreshGames(false);
    this.toastr.success('All games was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onGameDeletionError(): void {
    this.toastr.error('Game could not be deleted', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getGamePublicUrl(game: GameSummary): string {
    return `/view/game/${game.id}`;
  }

  downloadScoreSheet(game: GameSummary): void {
    this.publicService.getScoreSheet(game.id).subscribe(response => this.onScoreSheetReceived(response, game), error => this.onScoreSheetReceived(null, game));
  }

  onScoreSheetReceived(response: HttpResponse<any>, game: GameSummary): void {
    const dateStr = this.datePipe.transform(game.scheduledAt, 'dd_MM_yyyy');
    const filename = game.homeTeamName + '_' + game.guestTeamName + '_' + dateStr + '.html';
    const blob = new Blob([response.body], { type: 'text/html' });
    saveAs(response, filename);
  }

  getPageNumber(): number {
    return 2;
  }
}
