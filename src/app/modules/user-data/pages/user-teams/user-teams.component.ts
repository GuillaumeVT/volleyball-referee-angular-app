import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserTeamDialogComponent, UserTeamDialogData } from 'src/app/modules/user-data/components/user-team-dialog/user-team-dialog.component';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { TeamService } from 'src/app/modules/user-data/services/team.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractTeamFilter } from 'src/app/shared/models/abstract-team-filter.model';
import { Team, TeamSummary } from 'src/app/shared/models/team.model';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent extends AbstractTeamFilter implements OnInit, OnDestroy {

  user: UserSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private teamService: TeamService, private dialog: MatDialog,
    private snackBarService: SnackBarService, private translate: TranslateService) {
    super(50);
    this.translate.get('user.team.page').subscribe(t => this.titleService.setTitle(t));
  }

  ngOnInit() {
    this.subscription.add(this.userService.authState.subscribe(userToken => {
      this.user = userToken.user;
      if (this.user) {
        this.refreshTeams(false);
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshTeams(append: boolean): void {
    this.teamService.listTeams(this.getKinds(), this.getGenders(), (append ? this.page : 0), this.size).subscribe(
      page => this.onTeamsReceived(page),
      _error => this.onTeamsReceived(null));
  }

  createTeam(kind: string): void {
    const team = Team.createTeam(this.user, kind);

    const data: UserTeamDialogData = {
      crudType: CrudType.Create,
      team: team
    }

    const dialogRef = this.dialog.open(UserTeamDialogComponent, { width: "800px", data: data });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.onTeamCreated();
      }
    });
  }

  viewTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe(
      team => {
        const data: UserTeamDialogData = {
          crudType: CrudType.View,
          team: team
        }
    
        const dialogRef = this.dialog.open(UserTeamDialogComponent, { width: "800px", data: data });
      },
      _error => this.snackBarService.showError('Team could not be found.')
    );
  }

  updateTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe(
      team => {
        const data: UserTeamDialogData = {
          crudType: CrudType.Update,
          team: team
        }
    
        const dialogRef = this.dialog.open(UserTeamDialogComponent, { width: "800px", data: data });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.onTeamUpdated();
          }
        });
      },
      _error => this.snackBarService.showError('Team could not be found.')
    );
  }

  deleteTeam(teamSummary: TeamSummary): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete team', message: `Do you want to delete the team named ${teamSummary.name}?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.teamService.deleteTeam(teamSummary.id).subscribe(_deleted => this.onTeamDeleted(), _error => this.onTeamDeletionError());
      }
    });
  }

  deleteAllTeams(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete ALL teams', message: 'Do you want to delete ALL the teams?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.teamService.deleteAllTeams().subscribe(_deleted => this.onAllTeamsDeleted());
      }
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
    this.snackBarService.showError('Team could not be deleted. Is it used in a scheduled game?');
  }
}
