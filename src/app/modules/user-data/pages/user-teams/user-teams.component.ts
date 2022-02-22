import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractTeamFilter } from '@shared/models/abstract-team-filter.model';
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
  user: UserSummary;

  private subscription: Subscription = new Subscription();

  constructor(
    private titleService: Title,
    private userService: UserService,
    private teamService: TeamService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private translate: TranslateService,
  ) {
    super(50);
    this.translate.get('user.team.page').subscribe((t) => this.titleService.setTitle(t));
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.authState.subscribe((userToken) => {
        this.user = userToken.user;
        if (this.user) {
          this.refreshTeams(false);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshTeams(append: boolean): void {
    this.teamService.listTeams(this.getKinds(), this.getGenders(), append ? this.page : 0, this.size).subscribe(
      (page) => this.onTeamsReceived(page),
      (_error) => this.onTeamsReceived(null),
    );
  }

  createTeam(kind: string): void {
    const team = Team.createTeam(this.user, kind);

    const data: UserTeamDialogData = {
      crudType: CrudType.Create,
      team: team,
    };

    const dialogRef = this.dialog.open(UserTeamDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onTeamCreated();
      }
    });
  }

  viewTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe((team) => {
      const data: UserTeamDialogData = {
        crudType: CrudType.View,
        team: team,
      };

      const dialogRef = this.dialog.open(UserTeamDialogComponent, { width: '800px', data: data });
    });
  }

  updateTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe((team) => {
      const data: UserTeamDialogData = {
        crudType: CrudType.Update,
        team: team,
      };

      const dialogRef = this.dialog.open(UserTeamDialogComponent, { width: '800px', data: data });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.onTeamUpdated();
        }
      });
    });
  }

  deleteTeam(teamSummary: TeamSummary): void {
    this.translate.get(['user.team.delete', 'user.team.messages.delete-question'], { name: teamSummary.name }).subscribe((ts) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.team.delete'], message: ts['user.team.messages.delete-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.teamService.deleteTeam(teamSummary.id).subscribe(
            (_deleted) => this.onTeamDeleted(),
            (_error) => this.onTeamDeletionError(),
          );
        }
      });
    });
  }

  deleteAllTeams(): void {
    this.translate.get(['user.team.delete', 'user.team.messages.delete-all-question']).subscribe((ts) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.team.delete'], message: ts['user.team.messages.delete-all-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.teamService.deleteAllTeams().subscribe((_deleted) => this.onAllTeamsDeleted());
        }
      });
    });
  }

  onTeamCreated(): void {
    this.refreshTeams(false);
  }

  onTeamUpdated(): void {
    this.refreshTeams(false);
  }

  onTeamDeleted(): void {
    this.refreshTeams(false);
  }

  onAllTeamsDeleted(): void {
    this.refreshTeams(false);
  }

  onTeamDeletionError(): void {
    this.translate.get('user.team.messages.deleted-error').subscribe((t) => this.snackBarService.showError(t));
  }
}
