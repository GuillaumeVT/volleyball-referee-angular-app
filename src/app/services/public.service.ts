import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Statistics } from '../model/statistics';
import { Game, GameSummary } from '../model/game';
import { League } from '../model/league';
import { TeamSummary } from '../model/team';
import { Ranking } from '../model/ranking';

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

  listLiveGames(): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/live`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesMatchingToken(token: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/token/${token}`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesWithScheduleDate(date: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/date/${date}`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}`;
    return this.http.get<GameSummary[]>(url);
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

  listGamesOfTeamInLeague(leagueId: string, teamId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/team/${teamId}`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesInDivision(leagueId: string, divisionName: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}`;
    return this.http.get<GameSummary[]>(url);
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

  listGamesOfTeamInDivision(leagueId: string, divisionName: string, teamId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/team/${teamId}`;
    return this.http.get<GameSummary[]>(url);
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
