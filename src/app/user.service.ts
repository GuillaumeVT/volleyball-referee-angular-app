import { Rules } from './model/rules';
import { Team } from './model/team';
import { GameDescription } from './model/gamedescription';
import { League } from './model/league';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  private userUrl             = environment.api + '/user';
  private userRulesUrl        = this.userUrl + '/rules';
  private userTeamUrl         = this.userUrl + '/team';
  private userGameUrl         = this.userUrl + '/game';
  private userCodeUrl         = this.userGameUrl + '/code';
  private userLeagueUrl       = this.userUrl + '/league';
  private userTeamPublicUrl   = environment.api + '/view/team';
  private userLeaguePublicUrl = environment.api + '/view/league';

  constructor(private http: HttpClient) { }

  getNumberOfRules(): Observable<number> {
    const url = `${this.userRulesUrl}/count`;
    return this.http.get<number>(url);
  }

  getRules(): Observable<Rules[]> {
    return this.http.get<Rules[]>(this.userRulesUrl);
  }

  getDefaultRules(): Observable<Rules[]> {
    const url = `${this.userRulesUrl}/default`;
    return this.http.get<Rules[]>(url);
  }

  getSingleRules(name: string): Observable<Rules> {
    let params = new HttpParams().set("name", name);
    return this.http.get<Rules>(this.userRulesUrl, { params: params });
  }

  createRules(rules: Rules): Observable<Rules> {
    return this.http.post<Rules>(this.userRulesUrl, rules);
  }

  updateRules(rules: Rules): Observable<Rules> {
    return this.http.put<Rules>(this.userRulesUrl, rules);
  }

  deleteRules(name: string): Observable<Object> {
    let params = new HttpParams().set("name", name);
    return this.http.delete(this.userRulesUrl, { params: params });
  }

  deleteAllRules(): Observable<Object> {
    return this.http.delete(this.userRulesUrl);
  }

  getNumberOfTeams(): Observable<number> {
    const url = `${this.userTeamUrl}/count`;
    return this.http.get<number>(url);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.userTeamUrl);
  }

  getTeamsInLeaguePublic(date: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.userTeamPublicUrl}/${date}`);
  }

  getTeamsWithKind(kind: string): Observable<Team[]> {
    let params = new HttpParams().set("kind", kind);
    return this.http.get<Team[]>(this.userTeamUrl, { params: params });
  }

  getTeam(name: string, gender: string, kind: string): Observable<Team> {
    let params = new HttpParams().set("name", name).set("gender", gender).set("kind", kind);
    return this.http.get<Team>(this.userTeamUrl, { params: params });
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.userTeamUrl, team);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(this.userTeamUrl, team);
  }

  deleteTeam(name: string, gender: string, kind: string): Observable<Object> {
    let params = new HttpParams().set("name", name).set("gender", gender).set("kind", kind);
    return this.http.delete(this.userTeamUrl, { params: params });
  }

  deleteAllTeams(): Observable<Object> {
    return this.http.delete(this.userTeamUrl);
  }

  getNumberOfGames(): Observable<number> {
    const url = `${this.userGameUrl}/count`;
    return this.http.get<number>(url);
  }

  getNumberOfGamesInLeague(kind: string, league: string): Observable<number> {
    let params = new HttpParams().set("kind", kind).set("league", league);
    const url = `${this.userGameUrl}/count`;
    return this.http.get<number>(url, { params: params });
  }

  getGames(): Observable<GameDescription[]> {
    return this.http.get<GameDescription[]>(this.userGameUrl);
  }

  getGamesOfLeague(kind: string, league: string): Observable<GameDescription[]> {
    let params = new HttpParams().set('kind', kind).set('league', league);
    return this.http.get<GameDescription[]>(this.userGameUrl, { params: params });
  }

  getGame(id: number): Observable<GameDescription> {
    let params = new HttpParams().set("id", String(id));
    return this.http.get<GameDescription>(this.userGameUrl, { params: params });
  }

  getGameCode(id: number): Observable<number> {
    let params = new HttpParams().set("id", String(id));
    return this.http.get<number>(this.userCodeUrl, { params: params });
  }

  createGame(game: GameDescription): Observable<GameDescription> {
    return this.http.post<GameDescription>(this.userGameUrl, game);
  }

  updateGame(game: GameDescription): Observable<GameDescription> {
    return this.http.put<GameDescription>(this.userGameUrl, game);
  }

  deleteGame(id: number): Observable<Object> {
    let params = new HttpParams().set("id", String(id));
    return this.http.delete(this.userGameUrl, { params: params });
  }

  getNumberOfLeagues(): Observable<number> {
    const url = `${this.userLeagueUrl}/count`;
    return this.http.get<number>(url);
  }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.userLeagueUrl);
  }

  getDivisionsWithKind(kind: string): Observable<string[]> {
    let params = new HttpParams().set('kind', kind);
    return this.http.get<string[]>(`${this.userLeagueUrl}/division`, { params: params });
  }

  getLeaguesWithKind(kind: string): Observable<League[]> {
    let params = new HttpParams().set('kind', kind);
    return this.http.get<League[]>(this.userLeagueUrl, { params: params });
  }

  getLeaguePublic(date: number): Observable<League> {
    return this.http.get<League>(`${this.userLeaguePublicUrl}/${date}`);
  }

  getLeague(date: number): Observable<League> {
    let params = new HttpParams().set("date", String(date));
    return this.http.get<League>(this.userLeagueUrl, { params: params });
  }

  createLeague(league: League): Observable<League> {
    return this.http.post<League>(this.userLeagueUrl, league);
  }

  deleteLeague(date: number): Observable<Object> {
    let params = new HttpParams().set("date", String(date));
    return this.http.delete(this.userLeagueUrl, { params: params });
  }

  getCsvLeague(league: string, division: string): Observable<any> {
    const url = `${this.userLeagueUrl}/csv`;
    let params = new HttpParams().set('league', league).set('division', division);
    return this.http.get<any>(url, { params: params, headers: { 'Content-Type': 'application/json', 'Accept': 'text/csv'}, responseType: 'blob' as 'json' });
  }
}
