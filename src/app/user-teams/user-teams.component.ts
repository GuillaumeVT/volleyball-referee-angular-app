import { Team } from '../model/team';
import { CrudType } from '../model/crudtype';
import { TeamFilter } from '../utils/teamfilter';
import { Utils } from '../utils/utils';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
export class UserTeamsComponent implements OnInit {

  signedIn:   boolean;
  teamFilter: TeamFilter;

  constructor(private titleService: Title, private router: Router, private authService: AuthService, private userService: UserService, private modalService: NgbModal, private utils: Utils, private toastr: ToastrService) {
    this.titleService.setTitle('Volleyball Referee - User');
    this.signedIn = false;
    this.teamFilter = new TeamFilter();
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.signedIn = (user != null);

      if (this.signedIn) {
        this.refreshTeams();
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

  refreshTeams(): void {
    this.userService.getTeams().subscribe(teams => this.teamFilter.updateTeams(teams), error => this.teamFilter.updateTeams([]));
  }

  createTeam(kind: string): void {
    const team = new Team();
    team.userId = '';
    team.name = '';
    team.kind = kind;
    team.date = new Date().getTime();
    team.gender = 'MIXED';
    team.color = '#000000';
    team.liberoColor = '#ff0000';
    team.players = [];
    team.liberos = [];
    team.captain = 1;

    if (team.kind === 'BEACH') {
      team.players.push(1);
      team.players.push(2);
    }

    const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = team;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.teamUpdated.subscribe(updated => this.onTeamCreated());
  }

  viewTeam(team: Team): void {
    const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = team;
    modalRef.componentInstance.crudType = CrudType.View;
  }

  updateTeam(team: Team): void {
    const modalRef = this.modalService.open(UserTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = team;
    modalRef.componentInstance.crudType = CrudType.Update;
    modalRef.componentInstance.teamUpdated.subscribe(updated => this.onTeamUpdated());
  }

  deleteTeam(team: Team): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete team';
    modalRef.componentInstance.message = `Do you want to delete the team named ${team.name}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.userService.deleteTeam(team.name, team.gender, team.kind).subscribe(deleted => this.onTeamDeleted(), error => this.onTeamNotDeleted()));
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

  onTeamNotDeleted(): void {
    this.toastr.error('Team could not be deleted. Is it used in a scheduled game?', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }
}
