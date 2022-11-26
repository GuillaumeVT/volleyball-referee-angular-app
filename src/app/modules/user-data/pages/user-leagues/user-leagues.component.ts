import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractLeagueFilter } from '@shared/models/abstract-league-filter.model';
import { League, LeagueSummary } from '@shared/models/league.model';
import { PublicService } from '@shared/services/public.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { UserLeagueDialogComponent } from '@user-data/components/user-league-dialog/user-league-dialog.component';
import { GameService } from '@user-data/services/game.service';
import { LeagueService } from '@user-data/services/league.service';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-leagues',
  templateUrl: './user-leagues.component.html',
  styleUrls: ['./user-leagues.component.scss'],
})
export class UserLeaguesComponent extends AbstractLeagueFilter implements OnInit, OnDestroy {
  user: UserSummary;
  countsMap: Map<string, number>;
  divisionsMap: Map<string, string[]>;

  private subscription: Subscription = new Subscription();

  constructor(
    private _titleService: Title,
    private _userService: UserService,
    private _leagueService: LeagueService,
    private _gameService: GameService,
    private _publicService: PublicService,
    private _dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _translateService: TranslateService,
  ) {
    super();
    this._translateService.get('user.league.page').subscribe((t) => this._titleService.setTitle(t));
    this.countsMap = new Map();
    this.divisionsMap = new Map();
  }

  ngOnInit() {
    this.subscription.add(
      this._userService.authState.subscribe((userToken) => {
        this.user = userToken.user;
        if (this.user) {
          this.refreshLeagues();
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshLeagues(): void {
    this._leagueService.listLeagues(this.getKinds()).subscribe({
      next: (leagues) => this.onLeaguesRefreshed(leagues),
      error: (_) => this.onLeaguesRefreshed([]),
    });
  }

  onLeaguesRefreshed(leagues: LeagueSummary[]): void {
    this.onLeaguesReceived(leagues);

    for (let league of this.leagues) {
      this.countsMap.set(league.id, 0);
      this._gameService.getNumberOfGamesInLeague(league.id).subscribe({
        next: (count) => this.countsMap.set(league.id, count.count),
        error: (_) => this.countsMap.set(league.id, 0),
      });
      this._leagueService.getLeague(league.id).subscribe({
        next: (league) => this.divisionsMap.set(league.id, league.divisions),
        error: (_) => this.divisionsMap.set(league.id, []),
      });
    }
  }

  createLeague(kind: string): void {
    const league = League.createLeague(this.user, kind);
    const dialogRef = this._dialog.open(UserLeagueDialogComponent, { width: '500px', data: league });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onLeagueCreated();
      }
    });
  }

  viewLeague(league: LeagueSummary): void {
    this._router.navigateByUrl(`games/league/${league.id}`);
  }

  deleteLeague(league: LeagueSummary): void {
    this._translateService.get(['user.league.delete', 'user.league.messages.delete-question'], { name: league.name }).subscribe((ts) => {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.league.delete'], message: ts['user.league.messages.delete-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this._leagueService.deleteLeague(league.id).subscribe({
            next: (_deleted) => this.onLeagueDeleted(),
            error: (_) => this.onLeagueDeletionError(),
          });
        }
      });
    });
  }

  deleteAllLeagues(): void {
    this._translateService.get(['user.league.delete', 'user.league.messages.delete-all-question']).subscribe((ts) => {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.league.delete'], message: ts['user.league.messages.delete-all-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this._leagueService.deleteAllLeagues().subscribe((_deleted) => this.onAllLeaguesDeleted());
        }
      });
    });
  }

  onLeagueCreated(): void {
    this.refreshLeagues();
  }

  onLeagueDeleted(): void {
    this.refreshLeagues();
  }

  onAllLeaguesDeleted(): void {
    this.refreshLeagues();
  }

  onLeagueDeletionError(): void {
    this._translateService.get('user.league.messages.deleted-error').subscribe((t) => this._snackBarService.showError(t));
  }

  getLeaguePublicUrl(league: LeagueSummary): string {
    return `/view/league/${league.id}`;
  }

  downloadDivisionExcel(league: LeagueSummary, divisionName: string): void {
    this._publicService.listGamesInDivisionExcel(league.id, divisionName).subscribe({
      next: (blob: Blob) => this.onDivisionExcelReceived(blob, league, divisionName),
      error: (_) => this.onDivisionExcelReceived(null, league, divisionName),
    });
  }

  onDivisionExcelReceived(blob: Blob, league: LeagueSummary, divisionName: string): void {
    const dateStr = this._datePipe.transform(new Date().getTime(), 'dd_MM_yyyy__HH_mm');
    const filename = league.name + '_' + divisionName + '_' + dateStr + '.xlsx';
    saveAs(blob, filename);
  }
}
