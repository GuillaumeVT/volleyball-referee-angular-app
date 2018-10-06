import { GameDescription } from '../model/gamedescription';
import { Rules } from '../model/rules';
import { Team } from '../model/team';
import { League } from '../model/league';
import { CrudType } from '../model/crudtype';
import { GameFilter } from '../utils/gamefilter';
import { Utils } from '../utils/utils';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
export class UserGamesComponent implements OnInit {

  signedIn:       boolean;
  gameFilter:     GameFilter;
  rules:          Rules[];
  defaultRules:   Rules[];
  codeMap:        Map<number,number>;
  selectedLeague: string;
  selectedKind:   string;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe,
    private authService: AuthService, private userService: UserService, private gameService: GameService,
    private modalService: NgbModal, private utils: Utils, private toastr: ToastrService) {
    this.titleService.setTitle('Volleyball Referee - User');
    this.signedIn = false;
    this.rules = [];
    this.defaultRules = [];
    this.codeMap = new Map();
    this.gameFilter = new GameFilter();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.signedIn = (user != null);

      if (this.signedIn) {
        this.selectedLeague = this.route.snapshot.paramMap.get('league');
        this.selectedKind = this.route.snapshot.paramMap.get('kind');

        this.refreshGames();
        this.refreshRules();
      } else {
        setTimeout(() => this.navigateToUser(), 1000);
      }
    });
  }

  navigateToUser(): void {
    if (!this.signedIn) {
      this.router.navigateByUrl('user');
    }
  }

  refreshGames(): void {
    if (this.selectedKind && this.selectedLeague) {
      this.userService.getGamesOfLeague(this.selectedKind, this.selectedLeague).subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    } else {
      this.userService.getGames().subscribe(games => this.gameFilter.updateGames(games), error => this.gameFilter.updateGames([]));
    }
  }

  refreshRules(): void {
    this.userService.getRules().subscribe(rules => this.rules = this.utils.sortRules(rules), error => this.rules = []);
    this.userService.getDefaultRules().subscribe(rules => this.defaultRules = rules, error => this.defaultRules = []);
  }

  createGame(kind: string): void {
    const game = new GameDescription();
    game.userId = '';
    game.kind = kind;
    game.date = new Date().getTime();
    game.schedule = new Date().getTime();
    game.gender = 'MIXED';
    game.usage = 'NORMAL';
    game.status = 'SCHEDULED';
    game.indexed = true;
    game.referee = '';
    if (this.selectedLeague) {
      game.league = this.selectedLeague;
    } else {
      game.league = '';
    }
    game.division = '';
    game.hName = '';
    game.gName = '';
    game.hSets = 0;
    game.gSets = 0;
    game.rules = '';

    forkJoin(
      this.userService.getTeamsWithKind(game.kind),
      this.userService.getLeaguesWithKind(game.kind),
      this.userService.getDivisionsWithKind(game.kind)
    )
    .subscribe(([teams, leagues, divisions]) => {
      this.launchCreateGame(game, leagues, divisions, teams);
    });
  }

  launchCreateGame(game: GameDescription, leagues: League[], divisions: String[], teams: Team[]): void {
    leagues = this.utils.sortLeagues(leagues);
    teams = this.utils.sortTeams(teams);
    divisions = divisions.sort((d1, d2) => (d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0));

    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.leagues = leagues;
    modalRef.componentInstance.divisions = divisions;
    modalRef.componentInstance.teams = teams;
    modalRef.componentInstance.rules = this.rules;
    modalRef.componentInstance.defaultRules = this.defaultRules;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.gameUpdated.subscribe(updated => this.onGameCreated());
  }

  viewGame(game: GameDescription): void {
    forkJoin(
      this.userService.getTeamsWithKind(game.kind),
      this.userService.getLeaguesWithKind(game.kind),
      this.userService.getDivisionsWithKind(game.kind)
    )
    .subscribe(([teams, leagues, divisions]) => {
      this.launchViewGame(game, leagues, divisions, teams);
    });
  }

  launchViewGame(game: GameDescription, leagues: League[], divisions: String[], teams: Team[]): void {
    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.leagues = leagues;
    modalRef.componentInstance.divisions = divisions;
    modalRef.componentInstance.teams = teams;
    modalRef.componentInstance.rules = this.rules;
    modalRef.componentInstance.defaultRules = this.defaultRules;
    modalRef.componentInstance.crudType = CrudType.View;
  }

  updateGame(game: GameDescription): void {
    forkJoin(
      this.userService.getTeamsWithKind(game.kind),
      this.userService.getLeaguesWithKind(game.kind),
      this.userService.getDivisionsWithKind(game.kind)
    )
    .subscribe(([teams, leagues, divisions]) => {
      this.launchUpdateGame(game, leagues, divisions, teams);
    });
  }

  launchUpdateGame(game: GameDescription, leagues: League[], divisions: String[], teams: Team[]): void {
    leagues = this.utils.sortLeagues(leagues);
    teams = this.utils.sortTeams(teams);
    divisions = divisions.sort((d1, d2) => (d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0));

    const modalRef = this.modalService.open(UserGameModalComponent, { size: 'lg' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.leagues = leagues;
    modalRef.componentInstance.divisions = divisions;
    modalRef.componentInstance.teams = teams;
    modalRef.componentInstance.rules = this.rules;
    modalRef.componentInstance.defaultRules = this.defaultRules;
    modalRef.componentInstance.crudType = CrudType.Update;
    modalRef.componentInstance.gameUpdated.subscribe(updated => this.onGameUpdated());
  }

  deleteGame(game: GameDescription): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete game';
    modalRef.componentInstance.message = `Do you want to delete the game ${game.hName} - ${game.gName}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.userService.deleteGame(game.date).subscribe(deleted => this.onGameDeleted(), error => this.onGameNotDeleted()));
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

  onGameNotDeleted(): void {
    this.toastr.error('Game could not be deleted', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  viewCode(game: GameDescription): void {
    this.userService.getGameCode(game.date).subscribe(code => this.addGameCode(game.date, code));
  }

  addGameCode(id: number, code: number): void {
    if (code > 0) {
      this.codeMap.set(id, code);
    }
  }

  getGamePublicUrl(game: GameDescription): string {
    return `/game/${game.date}`;
  }

  downloadScoreSheet(game: GameDescription): void {
    this.gameService.getScoreSheet(game.date).subscribe(response => this.onScoreSheetReceived(response, game), error => this.onScoreSheetReceived(null, game));
  }

  onScoreSheetReceived(response: HttpResponse<any>, game: GameDescription): void {
    const dateStr = this.datePipe.transform(game.schedule, 'dd_MM_yyyy');
    const filename = game.hName + '_' + game.gName + '_' + dateStr + '.html';
    const blob = new Blob([response.body], { type: 'html' });
    saveAs(response, filename);
  }
}
