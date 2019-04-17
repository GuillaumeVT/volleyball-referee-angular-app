import { Component, OnInit, OnDestroy } from '@angular/core';
import { League } from '../../model/league';
import { LeagueFilter } from '../../utils/leaguefilter';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { LeagueService } from '../../services/league.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLeagueModalComponent } from '../user-league-modal/user-league-modal.component';
import { OkCancelModalComponent } from '../../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs }from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-leagues',
  templateUrl: './user-leagues.component.html',
  styleUrls: ['./user-leagues.component.css']
})
export class UserLeaguesComponent implements OnInit, OnDestroy {

  user:         User;
  leagueFilter: LeagueFilter;
  countsMap:    Map<string,number>;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private leagueService: LeagueService, private gameService: GameService,
    private modalService: NgbModal, private toastr: ToastrService, private datePipe: DatePipe, private router: Router) {
    this.titleService.setTitle('VBR - My Leagues');
    this.leagueFilter = new LeagueFilter();
    this.countsMap = new Map();
  }

  ngOnInit() {
    this.subscription.add(this.userService.userState.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.refreshLeagues();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshLeagues(): void {
    this.leagueService.listLeagues().subscribe(leagues => this.onLeaguesRefreshed(leagues), error => this.onLeaguesRefreshed([]));
  }

  onLeaguesRefreshed(leagues: League[]): void {
    this.leagueFilter.updateLeagues(leagues);

    for (let league of this.leagueFilter.leagues) {
      this.countsMap.set(league.id, 0);
      this.gameService.getNumberOfGamesInLeague(league.id).subscribe(
        count => this.countsMap.set(league.id, count.count), error => this.countsMap.set(league.id, 0));
    }
  }

  createLeague(kind: string): void {
    const league = League.createLeague(this.user, kind);
    const modalRef = this.modalService.open(UserLeagueModalComponent, { size: 'lg' });
    modalRef.componentInstance.league = league;
    modalRef.componentInstance.leagueCreated.subscribe(created => this.onLeagueCreated());
  }

  viewLeague(league: League): void {
    this.router.navigateByUrl(`games/league/${league.id}`);
  }

  deleteLeague(league: League): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete tournament';
    modalRef.componentInstance.message = `Do you want to delete the tournament named ${league.name}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.leagueService.deleteLeague(league.id).subscribe(deleted => this.onLeagueDeleted(), error => this.onLeagueDeletionError()));
  }

  onLeagueCreated(): void {
    this.refreshLeagues();
    this.toastr.success('League was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onLeagueDeleted(): void {
    this.refreshLeagues();
    this.toastr.success('League was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onLeagueDeletionError(): void {
    this.toastr.error('League could not be deleted', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getLeaguePublicUrl(league: League): string {
    return `/view/league/${league.id}`;
  }

  downloadCsvLeague(league: League, divisionName: string): void {
    if (divisionName && divisionName.length > 0) {
      this.gameService.listGamesInDivisionCsv(league.id, divisionName).subscribe(response => this.onCsvLeagueReceived(response, league, divisionName), error => this.onCsvLeagueReceived(null, league, divisionName));
    } else {
      this.gameService.listGamesInLeagueCsv(league.id).subscribe(response => this.onCsvLeagueReceived(response, league, ""), error => this.onCsvLeagueReceived(null, league, ""));
    }
  }

  onCsvLeagueReceived(response: HttpResponse<any>, league: League, divisionName: string): void {
    const date = new Date();
    const dateStr = this.datePipe.transform(date.getTime(), 'dd_MM_yyyy__HH_mm');
    const filename = league.name + '_' + divisionName + '_' + dateStr + '.csv';
    const blob = new Blob([response.body], { type: 'csv' });
    saveAs(response, filename);
  }

  getPageNumber(): number {
    return 1;
  }
}
