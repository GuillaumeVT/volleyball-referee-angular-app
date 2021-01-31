import { Observable } from 'rxjs';
import { Game, GameSummary } from 'src/app/shared/models/game.model';
import { League } from 'src/app/shared/models/league.model';
import { Page } from 'src/app/shared/models/page.model';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { TeamSummary } from 'src/app/shared/models/team.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private publicUrl  = environment.api + '/public';
  private gamesUrl   = this.publicUrl + '/games';
  private teamsUrl   = this.publicUrl + '/teams';
  private leaguesUrl = this.publicUrl + '/leagues';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    const url = `${this.publicUrl}/statistics`;
    return this.http.get<Statistics>(url);
  }

  getGame(id: string): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url);
  }

  getScoreSheet(id: string): Observable<any> {
    const url = `${this.gamesUrl}/${id}/score-sheet`;
    const options = {headers: { 'Content-Type': 'application/json', 'Accept': 'text/html'}, responseType: 'blob' as 'json'};
    return this.http.get<any>(url, options);
  }

  listLiveGames(kinds: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/live`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let kind of kinds) {
      params = params.append("kind", kind);
    }
    for (let gender of genders) {
      params = params.append("gender", gender);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listGamesMatchingToken(token: string, statuses: string[], kinds: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/token/${token}`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let status of statuses) {
      params = params.append("status", status);
    }
    for (let kind of kinds) {
      params = params.append("kind", kind);
    }
    for (let gender of genders) {
      params = params.append("gender", gender);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listGamesWithScheduleDate(date: string, statuses: string[], kinds: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/date/${date}`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let status of statuses) {
      params = params.append("status", status);
    }
    for (let kind of kinds) {
      params = params.append("kind", kind);
    }
    for (let gender of genders) {
      params = params.append("gender", gender);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listGamesInLeague(leagueId: string, statuses: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/league/${leagueId}`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let status of statuses) {
      params = params.append("status", status);
    }
    for (let gender of genders) {
      params = params.append("gender", gender);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listLiveGamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/live`;
    return this.http.get<GameSummary[]>(url);
  }

  listNext10GamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/next-10`;
    return this.http.get<GameSummary[]>(url);
  }

  listLast10GamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/last-10`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesOfTeamInLeague(leagueId: string, teamId: string, statuses: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/league/${leagueId}/team/${teamId}`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let status of statuses) {
      params = params.append("status", status);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listGamesInDivision(leagueId: string, divisionName: string, statuses: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let status of statuses) {
      params = params.append("status", status);
    }
    for (let gender of genders) {
      params = params.append("gender", gender);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listLiveGamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/live`;
    return this.http.get<GameSummary[]>(url);
  }

  listNext10GamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/next-10`;
    return this.http.get<GameSummary[]>(url);
  }

  listLast10GamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/last-10`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesOfTeamInDivision(leagueId: string, divisionName: string, teamId: string, statuses: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/team/${teamId}`;
    let params = new HttpParams().set("page", String(page)).set("size", String(size));
    for (let status of statuses) {
      params = params.append("status", status);
    }
    return this.http.get<Page<GameSummary>>(url, { params: params });
  }

  listGamesInDivisionExcel(leagueId: string, divisionName: string): Observable<any> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/excel`;
    return this.http.get<any>(url, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob' as 'json' });
  }

  listRankingsInDivision(leagueId: string, divisionName: string): Observable<Ranking[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/rankings`;
    return this.http.get<Ranking[]>(url);
  }

  listTeamsOfLeague(leagueId: string): Observable<TeamSummary[]> {
    const url = `${this.teamsUrl}/league/${leagueId}`;
    return this.http.get<TeamSummary[]>(url);
  }

  listTeamsOfDivision(leagueId: string, divisionName: string): Observable<TeamSummary[]> {
    const url = `${this.teamsUrl}/league/${leagueId}/division/${divisionName}`;
    return this.http.get<TeamSummary[]>(url);
  }

  getLeague(leagueId: string): Observable<League> {
    const url = `${this.leaguesUrl}/${leagueId}`;
    return this.http.get<League>(url);
  }

}
