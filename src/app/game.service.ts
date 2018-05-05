import { Game } from './model/game';
import { GameDescription } from './model/gamedescription';
import { GameStatistics } from './model/gamestatistics';
import { Injectable } from '@angular/core';
import { Set } from './model/set';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../environments/environment';

@Injectable()
export class GameService {

  private apiUrl        = environment.api;
  private viewGameUrl   = this.apiUrl + '/view/game';
  private searchGameUrl = this.apiUrl + '/search/game';
  private gameStatsUrl  = this.apiUrl + '/stats/game';

  constructor(private http: HttpClient) { }

  getGame(id: number): Observable<Game> {
    const url = `${this.viewGameUrl}/${id}`;
    return this.http.get<Game>(url);
  }

  getPdfGame(id: number): Observable<any> {
    const url = `${this.viewGameUrl}/pdf/${id}`;
    const options = {headers: { 'Content-Type': 'application/json', 'Accept': 'application/pdf'}, responseType: 'blob' as 'json'};
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

  getGameStatistics() : Observable<GameStatistics> {
    return this.http.get<GameStatistics>(this.gameStatsUrl);
  }

}
