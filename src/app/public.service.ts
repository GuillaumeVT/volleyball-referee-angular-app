import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Statistics } from './model/statistics';
import { Game } from './model/game';
import { League } from './model/league';
import { GameDescription } from './model/game-description';
import { TeamDescription } from './model/team-description';

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

  listLiveGames(): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/live`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesMatchingToken(token: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/token/${token}`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesWithScheduleDate(date: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/date/${date}`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesInLeague(leagueId: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/league/${leagueId}`;
    return this.http.get<GameDescription[]>(url);
  }

  listLiveGamesInLeague(leagueId: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/live`;
    return this.http.get<GameDescription[]>(url);
  }

  listNext10GamesInLeague(leagueId: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/next-10`;
    return this.http.get<GameDescription[]>(url);
  }

  listLast10GamesInLeague(leagueId: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/last-10`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesOfTeamInLeague(leagueId: string, teamId: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/league/${leagueId}/team/${teamId}`;
    return this.http.get<GameDescription[]>(url);
  }

  listTeamsOfLeague(leagueId: string): Observable<TeamDescription[]> {
    const url = `${this.teamsUrl}/league/${leagueId}`;
    return this.http.get<TeamDescription[]>(url);
  }

  getLeague(leagueId: string): Observable<League> {
    const url = `${this.leaguesUrl}/${leagueId}`;
    return this.http.get<League>(url);
  }

}
