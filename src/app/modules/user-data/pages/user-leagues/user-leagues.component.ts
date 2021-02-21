import { FileSaverService } from 'ngx-filesaver';
import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserLeagueDialogComponent } from 'src/app/modules/user-data/components/user-league-dialog/user-league-dialog.component';
import { GameService } from 'src/app/modules/user-data/services/game.service';
import { LeagueService } from 'src/app/modules/user-data/services/league.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractLeagueFilter } from 'src/app/shared/models/abstract-league-filter.model';
import { League, LeagueSummary } from 'src/app/shared/models/league.model';
import { PublicService } from 'src/app/shared/services/public.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
    private dialog: MatDialog, private snackBarService: SnackBarService, private datePipe: DatePipe, private router: Router, private fileSaverService: FileSaverService) {
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
    const dialogRef = this.dialog.open(UserLeagueDialogComponent, { width: "500px", data: league });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.onLeagueCreated();
      }
    });
  }

  viewLeague(league: LeagueSummary): void {
    this.router.navigateByUrl(`games/league/${league.id}`);
  }

  deleteLeague(league: LeagueSummary): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete league', message: `Do you want to delete the league named ${league.name}?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.leagueService.deleteLeague(league.id).subscribe(_deleted => this.onLeagueDeleted(), _error => this.onLeagueDeletionError());
      }
    });
  }

  deleteAllLeagues(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete ALL leagues', message: 'Do you want to delete ALL the leagues?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.leagueService.deleteAllLeagues().subscribe(_deleted => this.onAllLeaguesDeleted());
      }
    });
  }

  onLeagueCreated(): void {
    this.refreshLeagues();
    this.snackBarService.showInfo('League was successfully created.');
  }

  onLeagueDeleted(): void {
    this.refreshLeagues();
    this.snackBarService.showInfo('League was successfully deleted.');
  }

  onAllLeaguesDeleted(): void {
    this.refreshLeagues();
    this.snackBarService.showInfo('All leagues were successfully deleted.');
  }

  onLeagueDeletionError(): void {
    this.snackBarService.showError('League could not be deleted.');
  }

  getLeaguePublicUrl(league: LeagueSummary): string {
    return `/view/league/${league.id}`;
  }

  downloadDivisionExcel(league: LeagueSummary, divisionName: string): void {
    this.publicService.listGamesInDivisionExcel(league.id, divisionName).subscribe((blob: Blob) => this.onDivisionExcelReceived(blob, league, divisionName), _error => this.onDivisionExcelReceived(null, league, divisionName));
  }

  onDivisionExcelReceived(blob: Blob, league: LeagueSummary, divisionName: string): void {
    const dateStr = this.datePipe.transform(new Date().getTime(), 'dd_MM_yyyy__HH_mm');
    const filename = league.name + '_' + divisionName + '_' + dateStr + '.xlsx';
    this.fileSaverService.save(blob, filename);
  }
}
