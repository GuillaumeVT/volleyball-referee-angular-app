import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserTeamModalComponent } from 'src/app/modules/user-data/components/user-team-modal/user-team-modal.component';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { TeamService } from 'src/app/modules/user-data/services/team.service';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';
import { AbstractTeamFilter } from 'src/app/shared/models/abstract-team-filter.model';
import { Team, TeamSummary } from 'src/app/shared/models/team.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.css']
})
export class UserTeamsComponent extends AbstractTeamFilter implements OnInit, OnDestroy {

  user: UserSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private teamService: TeamService, private modalService: NgbModal, private snackBarService: SnackBarService) {
    super(50);
    this.titleService.setTitle('VBR - My Teams');
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
    const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = team;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.teamUpdated.subscribe((_updated: any) => this.onTeamCreated());
  }

  viewTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe(
      team => {
        const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
        modalRef.componentInstance.team = team;
        modalRef.componentInstance.crudType = CrudType.View;
      },
      _error => this.snackBarService.showError('Team could not be found.', 5000)
    );
  }

  updateTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe(
      team => {
        const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
        modalRef.componentInstance.team = team;
        modalRef.componentInstance.crudType = CrudType.Update;
        modalRef.componentInstance.teamUpdated.subscribe((_updated: any) => this.onTeamUpdated());
      },
      _error => this.snackBarService.showError('Team could not be found.', 5000)
    );
  }

  deleteTeam(teamSummary: TeamSummary): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete team';
    modalRef.componentInstance.message = `Do you want to delete the team named ${teamSummary.name}?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.teamService.deleteTeam(teamSummary.id).subscribe(_deleted => this.onTeamDeleted(), _error => this.onTeamDeletionError()));
  }

  deleteAllTeams(): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete ALL teams';
    modalRef.componentInstance.message = `Do you want to delete ALL the teams?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.teamService.deleteAllTeams().subscribe(_deleted => this.onAllTeamsDeleted()));
  }

  onTeamCreated(): void {
    this.refreshTeams(false);
    this.snackBarService.showInfo('Team was successfully created.', 5000);
  }

  onTeamUpdated(): void {
    this.refreshTeams(false);
    this.snackBarService.showInfo('Team was successfully updated.', 5000);
  }

  onTeamDeleted(): void {
    this.refreshTeams(false);
    this.snackBarService.showInfo('Team was successfully deleted.', 5000);
  }

  onAllTeamsDeleted(): void {
    this.refreshTeams(false);
    this.snackBarService.showInfo('All teams were successfully deleted.', 5000);
  }

  onTeamDeletionError(): void {
    this.snackBarService.showError('Team could not be deleted. Is it used in a scheduled game?', 5000);
  }
}
