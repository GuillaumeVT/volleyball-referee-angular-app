import { Game } from './model/game';
import { GameDescription } from './model/gamedescription';
import { GameStatistics } from './model/gamestatistics';
import { Injectable } from '@angular/core';
import { Set } from './model/set';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class GameService {

  private apiUrl          = environment.api;
  private viewGameUrl     = this.apiUrl + '/view/game';
  private searchGameUrl   = this.apiUrl + '/search/game';
  private searchLeagueUrl = this.searchGameUrl + '/league';
  private gameStatsUrl    = this.apiUrl + '/stats/game';

  constructor(private http: HttpClient) { }

  getGame(id: number): Observable<Game> {
    const url = `${this.viewGameUrl}/${id}`;
    return this.http.get<Game>(url);
  }

  getScoreSheet(id: number): Observable<any> {
    const url = `${this.viewGameUrl}/score-sheet/${id}`;
    const options = {headers: { 'Content-Type': 'application/json', 'Accept': 'text/html'}, responseType: 'blob' as 'json'};
    return this.http.get<any>(url, options);
  }

  searchGames(token: string): Observable<GameDescription[]> {
    if (token.trim()) {
      const url = `${this.searchGameUrl}/${token}`;
      return this.http.get<GameDescription[]>(url);
    } else {
      return of([]);
    }
  }

  searchLiveGames(): Observable<GameDescription[]> {
    const url = `${this.searchGameUrl}/live`;
    return this.http.get<GameDescription[]>(url);
  }

  searchGamesByDate(date: string): Observable<GameDescription[]> {
    if (date.trim()) {
      const url = `${this.searchGameUrl}/date/${date}`;
      return this.http.get<GameDescription[]>(url);
    } else {
      return of([]);
    }
  }

  searchGamesInLeague(id: number): Observable<GameDescription[]> {
    const url = `${this.searchLeagueUrl}/${id}`;
    return this.http.get<GameDescription[]>(url);
  }

  searchGamesOfTeamInLeague(id: number, team: string, gender: string): Observable<GameDescription[]> {
    let params = new HttpParams().set('team', team).set('gender', gender);
    const url = `${this.searchLeagueUrl}/${id}`;
    return this.http.get<GameDescription[]>(url, { params: params });
  }

  searchLiveGamesInLeague(id: number): Observable<GameDescription[]> {
    const url = `${this.searchLeagueUrl}/${id}/live`;
    return this.http.get<GameDescription[]>(url);
  }

  searchLast10GamesInLeague(id: number): Observable<GameDescription[]> {
    const url = `${this.searchLeagueUrl}/${id}/last10`;
    return this.http.get<GameDescription[]>(url);
  }

  searchNext10GamesInLeague(id: number): Observable<GameDescription[]> {
    const url = `${this.searchLeagueUrl}/${id}/next10`;
    return this.http.get<GameDescription[]>(url);
  }

  getGameStatistics() : Observable<GameStatistics> {
    return this.http.get<GameStatistics>(this.gameStatsUrl);
  }

}
