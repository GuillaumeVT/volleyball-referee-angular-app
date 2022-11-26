import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, GameSummary, LeagueDashboard } from '@shared/models/game.model';
import { League } from '@shared/models/league.model';
import { Page } from '@shared/models/page.model';
import { Ranking } from '@shared/models/ranking.model';
import { StatisticsGroup } from '@shared/models/statistics.model';
import { TeamSummary } from '@shared/models/team.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _publicUrl = environment.api + '/public';
  private _gamesUrl = this._publicUrl + '/games';
  private _teamsUrl = this._publicUrl + '/teams';
  private _leaguesUrl = this._publicUrl + '/leagues';

  constructor(private _http: HttpClient) {}

  public getStatistics(): Observable<StatisticsGroup> {
    const url = `${this._publicUrl}/statistics`;
    return this._http.get<StatisticsGroup>(url);
  }

  public getGame(id: string): Observable<Game> {
    const url = `${this._gamesUrl}/${id}`;
    return this._http.get<Game>(url);
  }

  public getScoreSheet(id: string): Observable<any> {
    const url = `${this._gamesUrl}/${id}/score-sheet`;
    const options = { headers: { 'Content-Type': 'application/json', Accept: 'text/html' }, responseType: 'blob' as 'json' };
    return this._http.get<any>(url, options);
  }

  public listLiveGames(kinds: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/live`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let kind of kinds) {
      params = params.append('kind', kind);
    }
    for (let gender of genders) {
      params = params.append('gender', gender);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public listGamesMatchingToken(
    token: string,
    statuses: string[],
    kinds: string[],
    genders: string[],
    page: number,
    size: number,
  ): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/token/${token}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let status of statuses) {
      params = params.append('status', status);
    }
    for (let kind of kinds) {
      params = params.append('kind', kind);
    }
    for (let gender of genders) {
      params = params.append('gender', gender);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public listGamesWithScheduleDate(
    date: string,
    statuses: string[],
    kinds: string[],
    genders: string[],
    page: number,
    size: number,
  ): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/date/${date}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let status of statuses) {
      params = params.append('status', status);
    }
    for (let kind of kinds) {
      params = params.append('kind', kind);
    }
    for (let gender of genders) {
      params = params.append('gender', gender);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public listGamesInLeague(
    leagueId: string,
    statuses: string[],
    genders: string[],
    page: number,
    size: number,
  ): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/league/${leagueId}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let status of statuses) {
      params = params.append('status', status);
    }
    for (let gender of genders) {
      params = params.append('gender', gender);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public getGamesInLeagueGroupedByStatus(leagueId: string): Observable<LeagueDashboard> {
    const url = `${this._gamesUrl}/league/${leagueId}/group`;
    return this._http.get<LeagueDashboard>(url);
  }

  public listLiveGamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/live`;
    return this._http.get<GameSummary[]>(url);
  }

  public listNext10GamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/next-10`;
    return this._http.get<GameSummary[]>(url);
  }

  public listLast10GamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/last-10`;
    return this._http.get<GameSummary[]>(url);
  }

  public listGamesOfTeamInLeague(
    leagueId: string,
    teamId: string,
    statuses: string[],
    page: number,
    size: number,
  ): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/league/${leagueId}/team/${teamId}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let status of statuses) {
      params = params.append('status', status);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public listGamesInDivision(
    leagueId: string,
    divisionName: string,
    statuses: string[],
    genders: string[],
    page: number,
    size: number,
  ): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let status of statuses) {
      params = params.append('status', status);
    }
    for (let gender of genders) {
      params = params.append('gender', gender);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public getGamesInDivisionGroupedByStatus(leagueId: string, divisionName: string): Observable<LeagueDashboard> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/group`;
    return this._http.get<LeagueDashboard>(url);
  }

  public listLiveGamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/live`;
    return this._http.get<GameSummary[]>(url);
  }

  public listNext10GamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/next-10`;
    return this._http.get<GameSummary[]>(url);
  }

  public listLast10GamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/last-10`;
    return this._http.get<GameSummary[]>(url);
  }

  public listGamesOfTeamInDivision(
    leagueId: string,
    divisionName: string,
    teamId: string,
    statuses: string[],
    page: number,
    size: number,
  ): Observable<Page<GameSummary>> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/team/${teamId}`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    for (let status of statuses) {
      params = params.append('status', status);
    }
    return this._http.get<Page<GameSummary>>(url, { params: params });
  }

  public listGamesInDivisionExcel(leagueId: string, divisionName: string): Observable<any> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/excel`;
    return this._http.get<any>(url, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: 'blob' as 'json',
    });
  }

  public listRankingsInDivision(leagueId: string, divisionName: string): Observable<Ranking[]> {
    const url = `${this._gamesUrl}/league/${leagueId}/division/${divisionName}/rankings`;
    return this._http.get<Ranking[]>(url);
  }

  public listTeamsOfLeague(leagueId: string): Observable<TeamSummary[]> {
    const url = `${this._teamsUrl}/league/${leagueId}`;
    return this._http.get<TeamSummary[]>(url);
  }

  public listTeamsOfDivision(leagueId: string, divisionName: string): Observable<TeamSummary[]> {
    const url = `${this._teamsUrl}/league/${leagueId}/division/${divisionName}`;
    return this._http.get<TeamSummary[]>(url);
  }

  public getLeague(leagueId: string): Observable<League> {
    const url = `${this._leaguesUrl}/${leagueId}`;
    return this._http.get<League>(url);
  }
}
