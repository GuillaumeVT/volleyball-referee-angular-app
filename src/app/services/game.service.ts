import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../model/game';
import { GameDescription } from '../model/game-description';
import { Count } from '../model/count';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = environment.api + '/games';

  constructor(private http: HttpClient) { }

  listGames(): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesWithStatus(status: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/status/${status}`;
    return this.http.get<GameDescription[]>(url);
  }

  listAvailableGames(): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/available`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesInLeague(leagueId: string): Observable<GameDescription[]> {
    const url = `${this.gamesUrl}/league/${leagueId}`;
    return this.http.get<GameDescription[]>(url);
  }

  listGamesInDivisionExcel(leagueId: string, divisionName: string): Observable<any> {
    const url = `${this.gamesUrl}/league/${leagueId}/division/${divisionName}/excel`;
    return this.http.get<any>(url, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob' as 'json' });
  }

  getGame(gameId: string): Observable<Game> {
    const url = `${this.gamesUrl}/${gameId}`;
    return this.http.get<Game>(url);
  }

  getNumberOfGamesInLeague(leagueId: string): Observable<Count> {
    const url = `${this.gamesUrl}/league/${leagueId}/count`;
    return this.http.get<Count>(url);
  }

  createGame(game: GameDescription): Observable<GameDescription> {
    const url = `${this.gamesUrl}`;
    return this.http.post<GameDescription>(url, game);
  }

  updateGame(game: GameDescription): Observable<GameDescription> {
    const url = `${this.gamesUrl}`;
    return this.http.put<GameDescription>(url, game);
  }

  deleteGame(gameId: string): Observable<Object> {
    const url = `${this.gamesUrl}/${gameId}`;
    return this.http.delete(url);
  }

}