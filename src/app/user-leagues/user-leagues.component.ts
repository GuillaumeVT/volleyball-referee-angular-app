import { League } from '../model/league';
import { LeagueFilter } from '../utils/leaguefilter';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLeaguesModalComponent } from '../user-leagues-modal/user-leagues-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-leagues',
  templateUrl: './user-leagues.component.html',
  styleUrls: ['./user-leagues.component.css']
})
export class UserLeaguesComponent implements OnInit {

  signedIn:     boolean;
  leagueFilter: LeagueFilter;
  countsMap:    Map<string,number>;

  constructor(private titleService: Title, private router: Router, private authService: AuthService, private userService: UserService, private modalService: NgbModal, private toastr: ToastrService) {
    this.titleService.setTitle('Volleyball Referee - User');
    this.signedIn = false;
    this.leagueFilter = new LeagueFilter();
    this.countsMap = new Map();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.signedIn = (user != null);

      if (this.signedIn) {
        this.refreshLeagues();
      } else {
        setTimeout(() => this.navigateToUser(), 1000);
      }
    });
  }

  navigateToUser(): void {
    if (!this.signedIn) {
      this.router.navigateByUrl('user')
    }
  }

  refreshLeagues(): void {
    this.userService.getLeagues().subscribe(leagues => this.onLeaguesRefreshed(leagues), error => this.onLeaguesRefreshed([]));
  }

  onLeaguesRefreshed(leagues: League[]): void {
    this.leagueFilter.updateLeagues(leagues);

    for (let league of this.leagueFilter.leagues) {
      this.countsMap.set(league.name, 0);
      this.userService.getNumberOfGamesInLeague(league.kind, league.name).subscribe(
        count => this.countsMap.set(league.name, count), error => this.countsMap.set(league.name, 0));
    }
  }

  createLeague(kind: string): void {
    const league = new League();
    league.userId = this.userService.getUserId();
    league.kind = kind;
    league.date = new Date().getTime();
    league.name = '';

    const modalRef = this.modalService.open(UserLeaguesModalComponent, { size: 'lg' });
    modalRef.componentInstance.league = league;
    modalRef.componentInstance.leagueCreated.subscribe(created => this.onLeagueCreated());
  }

  viewLeague(league: League): void {
    this.router.navigateByUrl(`user/leagues/${league.name}/${league.kind}`);
  }

  deleteLeague(league: League): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete tournament';
    modalRef.componentInstance.message = `Do you want to delete the tournament named ${league.name}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.userService.deleteLeague(league.date).subscribe(deleted => this.onLeagueDeleted(), error => this.onLeagueNotDeleted()));
  }

  onLeagueCreated(): void {
    this.refreshLeagues();
    this.toastr.success('League was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onLeagueDeleted(): void {
    this.refreshLeagues();
    this.toastr.success('League was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onLeagueNotDeleted(): void {
    this.toastr.error('League could not be deleted', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getLeaguePublicUrl(league: League): string {
    return `/league/${league.date}`;
  }
}
