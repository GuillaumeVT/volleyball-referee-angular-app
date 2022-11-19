import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractTeamFilter } from '@shared/models/abstract-team-filter.model';
import { FetchBehaviour, Paging } from '@shared/models/page.model';
import { Team, TeamSummary } from '@shared/models/team.model';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { UserTeamDialogComponent, UserTeamDialogData } from '@user-data/components/user-team-dialog/user-team-dialog.component';
import { CrudType } from '@user-data/models/crud-type.model';
import { TeamService } from '@user-data/services/team.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss'],
})
export class UserTeamsComponent extends AbstractTeamFilter implements OnInit, OnDestroy {
  public user: UserSummary;

  private _subscription: Subscription = new Subscription();

  fetchBehaviour = FetchBehaviour;

  constructor(
    private _titleService: Title,
    private _userService: UserService,
    private _teamService: TeamService,
    private _dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _translate: TranslateService,
  ) {
    super(50);
    this._translate.get('user.team.page').subscribe((t) => this._titleService.setTitle(t));
  }

  ngOnInit(): void {
    this._subscription.add(
      this._userService.authState.subscribe((userToken) => {
        this.user = userToken.user;
        if (this.user) {
          this.requestRefreshTeams(FetchBehaviour.LOAD);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public refreshTeams(paging: Paging): void {
    this._teamService.listTeams(this.getKinds(), this.getGenders(), paging.page, paging.size).subscribe({
      next: (page) => this.onTeamsReceived(page),
      error: (_) => this.onTeamsReceived(null),
    });
  }

  public createTeam(kind: string): void {
    const team = Team.createTeam(this.user, kind);

    const data: UserTeamDialogData = {
      crudType: CrudType.Create,
      team: team,
    };

    const dialogRef = this._dialog.open(UserTeamDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onTeamCreated();
      }
    });
  }

  public viewTeam(teamSummary: TeamSummary): void {
    this._teamService.getTeam(teamSummary.id).subscribe((team) => {
      const data: UserTeamDialogData = {
        crudType: CrudType.View,
        team: team,
      };

      const dialogRef = this._dialog.open(UserTeamDialogComponent, { width: '800px', data: data });
    });
  }

  public updateTeam(teamSummary: TeamSummary): void {
    this._teamService.getTeam(teamSummary.id).subscribe((team) => {
      const data: UserTeamDialogData = {
        crudType: CrudType.Update,
        team: team,
      };

      const dialogRef = this._dialog.open(UserTeamDialogComponent, { width: '800px', data: data });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.onTeamUpdated();
        }
      });
    });
  }

  public deleteTeam(teamSummary: TeamSummary): void {
    this._translate.get(['user.team.delete', 'user.team.messages.delete-question'], { name: teamSummary.name }).subscribe((ts) => {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.team.delete'], message: ts['user.team.messages.delete-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this._teamService.deleteTeam(teamSummary.id).subscribe({
            next: (_deleted) => this.onTeamDeleted(),
            error: (_) => this.onTeamDeletionError(),
          });
        }
      });
    });
  }

  public deleteAllTeams(): void {
    this._translate.get(['user.team.delete', 'user.team.messages.delete-all-question']).subscribe((ts) => {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.team.delete'], message: ts['user.team.messages.delete-all-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this._teamService.deleteAllTeams().subscribe((_deleted) => this.onAllTeamsDeleted());
        }
      });
    });
  }

  private onTeamCreated(): void {
    this.requestRefreshTeams(FetchBehaviour.LOAD);
  }

  private onTeamUpdated(): void {
    this.requestRefreshTeams(FetchBehaviour.REFRESH);
  }

  private onTeamDeleted(): void {
    this.requestRefreshTeams(FetchBehaviour.REFRESH);
  }

  private onAllTeamsDeleted(): void {
    this.requestRefreshTeams(FetchBehaviour.LOAD);
  }

  private onTeamDeletionError(): void {
    this._translate.get('user.team.messages.deleted-error').subscribe((t) => this._snackBarService.showError(t));
  }
}
