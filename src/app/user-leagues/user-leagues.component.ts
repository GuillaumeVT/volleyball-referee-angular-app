import { Component, OnInit, OnDestroy } from '@angular/core';
import { League, LeagueSummary } from '../model/league';
import { AbstractLeagueFilter } from '../utils/abstract-league-filter';
import { UserSummary } from '../model/user';
import { UserService } from '../services/user.service';
import { LeagueService } from '../services/league.service';
import { GameService } from '../services/game.service';
import { PublicService } from '../services/public.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLeagueModalComponent } from './user-league-modal/user-league-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-leagues',
  templateUrl: './user-leagues.component.html',
  styleUrls: ['./user-leagues.component.css']
})
export class UserLeaguesComponent extends AbstractLeagueFilter implements OnInit, OnDestroy {

  user:         UserSummary;
  countsMap:    Map<string,number>;
  divisionsMap: Map<string,string[]>;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private leagueService: LeagueService, private gameService: GameService, private publicService: PublicService,
    private modalService: NgbModal, private toastr: ToastrService, private datePipe: DatePipe, private router: Router) {
    super();
    this.titleService.setTitle('VBR - My Leagues');
    this.countsMap = new Map();
    this.divisionsMap = new Map();
  }

  ngOnInit() {
    this.subscription.add(this.userService.authState.subscribe(userToken => {
      this.user = userToken.user;
      if (this.user) {
        this.refreshLeagues();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshLeagues(): void {
    this.leagueService.listLeagues(this.getKinds()).subscribe(leagues => this.onLeaguesRefreshed(leagues), _error => this.onLeaguesRefreshed([]));
  }

  onLeaguesRefreshed(leagues: LeagueSummary[]): void {
    this.onLeaguesReceived(leagues);

    for (let league of this.leagues) {
      this.countsMap.set(league.id, 0);
      this.gameService.getNumberOfGamesInLeague(league.id).subscribe(
        count => this.countsMap.set(league.id, count.count), _error => this.countsMap.set(league.id, 0));
      this.leagueService.getLeague(league.id).subscribe(
        league => this.divisionsMap.set(league.id, league.divisions), _error => this.divisionsMap.set(league.id, []));
    }
  }

  createLeague(kind: string): void {
    const league = League.createLeague(this.user, kind);
    const modalRef = this.modalService.open(UserLeagueModalComponent, { size: 'lg' });
    modalRef.componentInstance.league = league;
    modalRef.componentInstance.leagueCreated.subscribe(_created => this.onLeagueCreated());
  }

  viewLeague(league: LeagueSummary): void {
    this.router.navigateByUrl(`games/league/${league.id}`);
  }

  deleteLeague(league: LeagueSummary): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete tournament';
    modalRef.componentInstance.message = `Do you want to delete the tournament named ${league.name}?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.leagueService.deleteLeague(league.id).subscribe(_deleted => this.onLeagueDeleted(), _error => this.onLeagueDeletionError()));
  }

  deleteAllLeagues(): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete ALL tournaments';
    modalRef.componentInstance.message = `Do you want to delete ALL the tournaments?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.leagueService.deleteAllLeagues().subscribe(_deleted => this.onAllLeaguesDeleted()));
  }

  onLeagueCreated(): void {
    this.refreshLeagues();
    this.toastr.success('League was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onLeagueDeleted(): void {
    this.refreshLeagues();
    this.toastr.success('League was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onAllLeaguesDeleted(): void {
    this.refreshLeagues();
    this.toastr.success('All leagues were successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onLeagueDeletionError(): void {
    this.toastr.error('League could not be deleted', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getLeaguePublicUrl(league: League): string {
    return `/view/league/${league.id}`;
  }

  downloadDivisionExcel(league: League, divisionName: string): void {
    this.publicService.listGamesInDivisionExcel(league.id, divisionName).subscribe(response => this.onDivisionExcelReceived(response, league, divisionName), _error => this.onDivisionExcelReceived(null, league, divisionName));
  }

  onDivisionExcelReceived(response: HttpResponse<any>, league: League, divisionName: string): void {
    const date = new Date();
    const dateStr = this.datePipe.transform(date.getTime(), 'dd_MM_yyyy__HH_mm');
    const filename = league.name + '_' + divisionName + '_' + dateStr + '.xlsx';
    const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(response, filename);
  }

  getPageNumber(): number {
    return 1;
  }
}
