import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team, TeamSummary } from '../model/team';
import { CrudType } from '../model/crudtype';
import { AbstractTeamFilter } from '../utils/abstract-team-filter';
import { UserSummary } from '../model/user';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserTeamModalComponent } from './user-team-modal/user-team-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.css']
})
export class UserTeamsComponent extends AbstractTeamFilter implements OnInit, OnDestroy {

  user: UserSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private teamService: TeamService, private modalService: NgbModal, private toastr: ToastrService) {
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
    modalRef.componentInstance.teamUpdated.subscribe(_updated => this.onTeamCreated());
  }

  viewTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe(
      team => {
        const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
        modalRef.componentInstance.team = team;
        modalRef.componentInstance.crudType = CrudType.View;
      },
      _error => this.toastr.error('Team could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  updateTeam(teamSummary: TeamSummary): void {
    this.teamService.getTeam(teamSummary.id).subscribe(
      team => {
        const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
        modalRef.componentInstance.team = team;
        modalRef.componentInstance.crudType = CrudType.Update;
        modalRef.componentInstance.teamUpdated.subscribe(_updated => this.onTeamUpdated());
      },
      _error => this.toastr.error('Team could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  deleteTeam(teamSummary: TeamSummary): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete team';
    modalRef.componentInstance.message = `Do you want to delete the team named ${teamSummary.name}?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.teamService.deleteTeam(teamSummary.id).subscribe(_deleted => this.onTeamDeleted(), _error => this.onTeamDeletionError()));
  }

  deleteAllTeams(): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete ALL teams';
    modalRef.componentInstance.message = `Do you want to delete ALL the teams?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.teamService.deleteAllTeams().subscribe(_deleted => this.onAllTeamsDeleted()));
  }

  onTeamCreated(): void {
    this.refreshTeams(false);
    this.toastr.success('Team was successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onTeamUpdated(): void {
    this.refreshTeams(false);
    this.toastr.success('Team was successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onTeamDeleted(): void {
    this.refreshTeams(false);
    this.toastr.success('Team was successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onAllTeamsDeleted(): void {
    this.refreshTeams(false);
    this.toastr.success('All teams were successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onTeamDeletionError(): void {
    this.toastr.error('Team could not be deleted. Is it used in a scheduled game?', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  getPageNumber(): number {
    return 3;
  }
}
