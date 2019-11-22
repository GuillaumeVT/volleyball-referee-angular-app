import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game, GameSummary, GameIngredients } from '../model/game';
import { Count } from '../model/count';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = environment.api + '/games';

  constructor(private http: HttpClient) { }

  listGames(statuses: string[], kinds: string[], genders: string[], page: number, size: number): Observable<Page<GameSummary>> {
    const url = `${this.gamesUrl}`;
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

  listAvailableGames(): Observable<GameSummary[]> {
    const url = `${this.gamesUrl}/available`;
    return this.http.get<GameSummary[]>(url);
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

  deleteAllGames(): Observable<Object> {
    const url = `${this.gamesUrl}`;
    return this.http.delete(url);
  }

  deleteAllGamesInLeague(leagueId: string): Observable<Object> {
    const url = `${this.gamesUrl}/league/${leagueId}`;
    return this.http.delete(url);
  }

}
