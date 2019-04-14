import { Component, Injector } from '@angular/core';
import { AbstractUserDataComponent } from '../user/abstract-user-data.component';
import { Team } from '../model/team';
import { TeamDescription } from '../model/team-description';
import { CrudType } from '../model/crudtype';
import { TeamFilter } from '../utils/teamfilter';
import { Utils } from '../utils/utils';
import { TeamService } from '../team.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserTeamModalComponent } from '../user-team-modal/user-team-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.css']
})
export class UserTeamsComponent extends AbstractUserDataComponent {

  teamFilter: TeamFilter;

  constructor(injector: Injector, private titleService: Title, private teamService: TeamService, private modalService: NgbModal, private utils: Utils, private toastr: ToastrService) {
    super(injector);
    this.titleService.setTitle('VBR - My Teams');
    this.teamFilter = new TeamFilter();
  }

  refreshData(): void {
    this.refreshTeams();
  }

  refreshTeams(): void {
    this.teamService.listTeams().subscribe(teams => this.teamFilter.updateTeams(teams), error => this.teamFilter.updateTeams([]));
  }

  createTeam(kind: string): void {
    const team = Team.createTeam(this.user, kind);
    const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = team;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.teamUpdated.subscribe(updated => this.onTeamCreated());
  }

  viewTeam(teamDescription: TeamDescription): void {
    this.teamService.getTeam(teamDescription.id).subscribe(
      team => {
        const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
        modalRef.componentInstance.team = team;
        modalRef.componentInstance.crudType = CrudType.View;
      },
      error => this.toastr.error('Team could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  updateTeam(teamDescription: TeamDescription): void {
    this.teamService.getTeam(teamDescription.id).subscribe(
      team => {
        const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
        modalRef.componentInstance.team = team;
        modalRef.componentInstance.crudType = CrudType.Update;
        modalRef.componentInstance.teamUpdated.subscribe(updated => this.onTeamUpdated());
      },
      error => this.toastr.error('Team could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  deleteTeam(teamDescription: TeamDescription): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete team';
    modalRef.componentInstance.message = `Do you want to delete the team named ${teamDescription.name}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.teamService.deleteTeam(teamDescription.id).subscribe(deleted => this.onTeamDeleted(), error => this.onTeamDeletionError()));
  }

  onTeamCreated(): void {
    this.refreshTeams();
    this.toastr.success('Team was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onTeamUpdated(): void {
    this.refreshTeams();
    this.toastr.success('Team was successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onTeamDeleted(): void {
    this.refreshTeams();
    this.toastr.success('Team was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onTeamDeletionError(): void {
    this.toastr.error('Team could not be deleted. Is it used in a scheduled game?', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }
}
