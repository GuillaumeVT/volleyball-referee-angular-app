import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Team } from '../model/team';
import { TeamDescription } from '../model/team-description';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsUrl = environment.api + '/teams';

  constructor(private http: HttpClient) { }

  listTeams(): Observable<TeamDescription[]> {
    const url = `${this.teamsUrl}`;
    return this.http.get<TeamDescription[]>(url);
  }

  listTeamsOfKind(kind: string): Observable<TeamDescription[]> {
    const url = `${this.teamsUrl}/kind/${kind}`;
    return this.http.get<TeamDescription[]>(url);
  }

  getTeam(teamId: string): Observable<Team> {
    const url = `${this.teamsUrl}/${teamId}`;
    return this.http.get<Team>(url);
  }

  createTeam(team: Team): Observable<Team> {
    const url = `${this.teamsUrl}`;
    return this.http.post<Team>(url, team);
  }

  updateTeam(team: Team): Observable<Team> {
    const url = `${this.teamsUrl}`;
    return this.http.put<Team>(url, team);
  }

  deleteTeam(teamId: string): Observable<Object> {
    const url = `${this.teamsUrl}/${teamId}`;
    return this.http.delete(url);
  }
}
