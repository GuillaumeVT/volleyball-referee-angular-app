import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { Team, TeamSummary } from 'src/app/shared/models/team.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsUrl = environment.api + '/teams';

  constructor(private http: HttpClient) {}

  listTeams(kinds: string[], genders: string[], page: number, size: number): Observable<Page<TeamSummary>> {
    const url = `${this.teamsUrl}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let kind of kinds) {
      params = params.append('kind', kind);
    }
    for (let gender of genders) {
      params = params.append('gender', gender);
    }
    return this.http.get<Page<TeamSummary>>(url, { params: params });
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

  deleteAllTeams(): Observable<Object> {
    const url = `${this.teamsUrl}`;
    return this.http.delete(url);
  }
}
