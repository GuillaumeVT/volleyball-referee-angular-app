import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game, GameSummary, GameIngredients } from '../model/game';
import { Count } from '../model/count';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = environment.api + '/games';

  constructor(private http: HttpClient) { }

  listGames(): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesWithStatus(status: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/status/${status}`;
    return this.http.get<GameSummary[]>(url);
  }

  listAvailableGames(): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/available`;
    return this.http.get<GameSummary[]>(url);
  }

  listGamesInLeague(leagueId: string): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/league/${leagueId}`;
    return this.http.get<GameSummary[]>(url);
  }

  getGame(gameId: string): Observable<Game> {
    const url = `${this.gamesUrl}/${gameId}`;
    return this.http.get<Game>(url);
  }

  getGameIngredientsOfKind(kind: string): Observable<GameIngredients> {
    const url = `${this.gamesUrl}/ingredients/${kind}`;
    return this.http.get<GameIngredients>(url);
  }

  getNumberOfGamesInLeague(leagueId: string): Observable<Count> {
    const url = `${this.gamesUrl}/league/${leagueId}/count`;
    return this.http.get<Count>(url);
  }

  createGame(game: GameSummary): Observable<GameSummary> {
    const url = `${this.gamesUrl}`;
    return this.http.post<GameSummary>(url, game);
  }

  updateGame(game: GameSummary): Observable<GameSummary> {
    const url = `${this.gamesUrl}`;
    return this.http.put<GameSummary>(url, game);
  }

  updateReferee(gameId: string, refereeUserId: string): Observable<Object> {
    const url = `${this.gamesUrl}/${gameId}/referee/${refereeUserId}`;
    return this.http.patch<Object>(url, {});
  }

  deleteGame(gameId: string): Observable<Object> {
    const url = `${this.gamesUrl}/${gameId}`;
    return this.http.delete(url);
  }

}
