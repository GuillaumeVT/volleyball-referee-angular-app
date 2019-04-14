import { Component, Injector } from '@angular/core';
import { AbstractUserDataComponent } from '../user/abstract-user-data.component';
import { GameDescription } from '../model/game-description';
import { RulesDescription } from '../model/rules-description';
import { TeamDescription } from '../model/team-description';
import { League } from '../model/league';
import { CrudType } from '../model/crudtype';
import { GameFilter } from '../utils/gamefilter';
import { Utils } from '../utils/utils';
import { GameService } from '../game.service';
import { RulesService } from '../rules.service';
import { TeamService } from '../team.service';
import { LeagueService } from '../league.service';
import { PublicService } from '../public.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserGameModalComponent } from '../user-game-modal/user-game-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs }from 'file-saver';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent extends AbstractUserDataComponent {

  gameFilter:       GameFilter;
  selectedLeagueId: string;
  selectedLeague:   League;

  constructor(injector: Injector, private titleService: Title, private route: ActivatedRoute, private datePipe: DatePipe,
    private gameService: GameService, private rulesService: RulesService, private teamService: TeamService, private leagueService: LeagueService,
    private publicService: PublicService, private modalService: NgbModal, private utils: Utils, private toastr: ToastrService) {
    super(injector);
    this.titleService.setTitle('VBR - My Games');
    this.gameFilter = new GameFilter();
  }

  refreshData(): void {
    this.selectedLeagueId = this.route.snapshot.paramMap.get('leagueId');
    this.refreshGames();
  }

  refreshGames(): void {
    if (this.selectedLeagueId) {
      forkJoin(
        this.leagueService.getLeague(this.selectedLeagueId),
        this.gameService.listGamesInLeague(this.selectedLeagueId)
      )
      .subscribe(([league, games]) => {
        this.selectedLeague = league;
        this.gameFilter.updateGames(games);
      });
    } else {
      this.gameService.listGames().subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    }
  }

  createGame(kind: string): void {
    const game = GameDescription.createGame(this.user, kind, this.selectedLeague);
    forkJoin(
      this.rulesService.getDefaultRules(game.kind),
      this.rulesService.listRulesOfKind(game.kind),
      this.teamService.listTeamsOfKind(game.kind),
      this.leagueService.listLeaguesOfKind(game.kind)
    )
    .subscribe(([defaultRules, rules, teams, leagues]) => {
      this.launchCreateGame(game, leagues, teams, rules, defaultRules);
    });
  }

  launchCreateGame(game: GameDescription, leagues: League[], teams: TeamDescription[], rules: RulesDescription[], defaultRules: RulesDescription): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.leagues = leagues;
    modalRef.componentInstance.teams = teams;
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.defaultRules = defaultRules;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.gameUpdated.subscribe(updated => this.onGameCreated());
  }

  viewGame(game: GameDescription): void {
    forkJoin(
      this.rulesService.getDefaultRules(game.kind),
      this.rulesService.listRulesOfKind(game.kind),
      this.teamService.listTeamsOfKind(game.kind),
      this.leagueService.listLeaguesOfKind(game.kind)
    )
    .subscribe(([defaultRules, rules, teams, leagues]) => {
      this.launchViewGame(game, leagues, teams, rules, defaultRules);
    });
  }

  launchViewGame(game: GameDescription, leagues: League[], teams: TeamDescription[], rules: RulesDescription[], defaultRules: RulesDescription): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.leagues = leagues;
    modalRef.componentInstance.teams = teams;
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.defaultRules = defaultRules;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.crudType = CrudType.View;
  }

  updateGame(game: GameDescription): void {
    const copy = GameDescription.copyGame(game);
    forkJoin(
      this.rulesService.getDefaultRules(game.kind),
      this.rulesService.listRulesOfKind(game.kind),
      this.teamService.listTeamsOfKind(game.kind),
      this.leagueService.listLeaguesOfKind(game.kind)
    )
    .subscribe(([defaultRules, rules, teams, leagues]) => {
      this.launchUpdateGame(copy, leagues, teams, rules, defaultRules);
    });
  }

  launchUpdateGame(game: GameDescription, leagues: League[], teams: TeamDescription[], rules: RulesDescription[], defaultRules: RulesDescription): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.leagues = leagues;
    modalRef.componentInstance.teams = teams;
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.defaultRules = defaultRules;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.crudType = CrudType.Update;
    modalRef.componentInstance.gameUpdated.subscribe(updated => this.onGameUpdated());
  }

  deleteGame(game: GameDescription): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete game';
    modalRef.componentInstance.message = `Do you want to delete the game ${game.homeTeamName} - ${game.guestTeamName}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.gameService.deleteGame(game.id).subscribe(deleted => this.onGameDeleted(), error => this.onGameDeletionError()));
  }

  onGameCreated(): void {
    this.refreshGames();
    this.toastr.success('Game was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onGameUpdated(): void {
    this.refreshGames();
    this.toastr.success('Game was successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onGameDeleted(): void {
    this.refreshGames();
    this.toastr.success('Game was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onGameDeletionError(): void {
    this.toastr.error('Game could not be deleted', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getGamePublicUrl(game: GameDescription): string {
    return `/view/game/${game.id}`;
  }

  downloadScoreSheet(game: GameDescription): void {
    this.publicService.getScoreSheet(game.id).subscribe(response => this.onScoreSheetReceived(response, game), error => this.onScoreSheetReceived(null, game));
  }

  onScoreSheetReceived(response: HttpResponse<any>, game: GameDescription): void {
    const dateStr = this.datePipe.transform(game.scheduledAt, 'dd_MM_yyyy');
    const filename = game.homeTeamName + '_' + game.guestTeamName + '_' + dateStr + '.html';
    const blob = new Blob([response.body], { type: 'html' });
    saveAs(response, filename);
  }
}
