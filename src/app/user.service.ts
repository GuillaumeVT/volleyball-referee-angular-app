import { Rules } from './model/rules';
import { Team } from './model/team';
import { GameDescription } from './model/gamedescription';
import { League } from './model/league';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../environments/environment';
import { AuthService, SocialUser } from 'angularx-social-login';

@Injectable()
export class UserService {

  private user:     SocialUser;
  private signedIn: boolean;

  private userUrl        = environment.api + '/user';
  private userRulesUrl   = this.userUrl + '/rules';
  private userTeamUrl    = this.userUrl + '/team';
  private userGameUrl    = this.userUrl + '/game';
  private userCodeUrl    = this.userGameUrl + '/code';
  private userLeagueUrl  = this.userUrl + '/league';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.signedIn = false;
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signedIn = (user != null);
    });
  }

  getUserId(): string {
    return this.user.id + '@' + this.user.provider.toLowerCase();
  }

  getNumberOfRules(): Observable<number> {
    let params = new HttpParams().set("userId", this.getUserId());
    const url = `${this.userRulesUrl}/count`;
    return this.http.get<number>(url, { params: params });
  }

  getRules(): Observable<Rules[]> {
    let params = new HttpParams().set("userId", this.getUserId());
    return this.http.get<Rules[]>(this.userRulesUrl, { params: params });
  }

  getDefaultRules(): Observable<Rules[]> {
    let params = new HttpParams().set("userId", this.getUserId());
    const url = `${this.userRulesUrl}/default`;
    return this.http.get<Rules[]>(url, { params: params });
  }

  getSingleRules(name: string): Observable<Rules> {
    let params = new HttpParams().set("name", name).set("userId", this.getUserId());
    return this.http.get<Rules>(this.userRulesUrl, { params: params });
  }

  createRules(rules: Rules): Observable<Rules> {
    return this.http.post<Rules>(this.userRulesUrl, rules);
  }

  updateRules(rules: Rules): Observable<Rules> {
    return this.http.put<Rules>(this.userRulesUrl, rules);
  }

  deleteRules(name: string): Observable<Object> {
    let params = new HttpParams().set("name", name).set("userId", this.getUserId());
    return this.http.delete(this.userRulesUrl, { params: params });
  }

  getNumberOfTeams(): Observable<number> {
    let params = new HttpParams().set("userId", this.getUserId());
    const url = `${this.userTeamUrl}/count`;
    return this.http.get<number>(url, { params: params });
  }

  getTeams(): Observable<Team[]> {
    let params = new HttpParams().set("userId", this.getUserId());
    return this.http.get<Team[]>(this.userTeamUrl, { params: params });
  }

  getTeamsWithKindInLeaguePublic(date: number): Observable<Team[]> {
    let params = new HttpParams().set("date", String(date));
    return this.http.get<Team[]>(this.userTeamUrl, { params: params });
  }

  getTeamsWithKind(kind: string): Observable<Team[]> {
    let params = new HttpParams().set("userId", this.getUserId()).set("kind", kind);
    return this.http.get<Team[]>(this.userTeamUrl, { params: params });
  }

  getTeam(name: string, gender: string): Observable<Team> {
    let params = new HttpParams().set("name", name).set("userId", this.getUserId()).set("gender", gender);
    return this.http.get<Team>(this.userTeamUrl, { params: params });
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.userTeamUrl, team);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(this.userTeamUrl, team);
  }

  deleteTeam(name: string, gender: string): Observable<Object> {
    let params = new HttpParams().set("name", name).set("userId", this.getUserId()).set("gender", gender);
    return this.http.delete(this.userTeamUrl, { params: params });
  }

  getNumberOfGames(): Observable<number> {
    let params = new HttpParams().set("userId", this.getUserId());
    const url = `${this.userGameUrl}/count`;
    return this.http.get<number>(url, { params: params });
  }

  getNumberOfGamesInLeague(kind: string, league: string): Observable<number> {
    let params = new HttpParams().set("userId", this.getUserId()).set("kind", kind).set("league", league);
    const url = `${this.userGameUrl}/count`;
    return this.http.get<number>(url, { params: params });
  }

  getGames(): Observable<GameDescription[]> {
    let params = new HttpParams().set("userId", this.getUserId());
    return this.http.get<GameDescription[]>(this.userGameUrl, { params: params });
  }

  getGamesOfLeague(kind: string, league: string): Observable<GameDescription[]> {
    let params = new HttpParams().set("userId", this.getUserId()).set('kind', kind).set('league', league);
    return this.http.get<GameDescription[]>(this.userGameUrl, { params: params });
  }

  getGame(id: number): Observable<GameDescription> {
    let params = new HttpParams().set("id", String(id)).set("userId", this.getUserId());
    return this.http.get<GameDescription>(this.userGameUrl, { params: params });
  }

  getGameCode(id: number): Observable<number> {
    let params = new HttpParams().set("id", String(id)).set("userId", this.getUserId());
    return this.http.get<number>(this.userCodeUrl, { params: params });
  }

  createGame(game: GameDescription): Observable<GameDescription> {
    return this.http.post<GameDescription>(this.userGameUrl, game);
  }

  updateGame(game: GameDescription): Observable<GameDescription> {
    return this.http.put<GameDescription>(this.userGameUrl, game);
  }

  deleteGame(id: number): Observable<Object> {
    let params = new HttpParams().set("id", String(id)).set("userId", this.getUserId());
    return this.http.delete(this.userGameUrl, { params: params });
  }

  getNumberOfLeagues(): Observable<number> {
    let params = new HttpParams().set("userId", this.getUserId());
    const url = `${this.userLeagueUrl}/count`;
    return this.http.get<number>(url, { params: params });
  }

  getLeagues(): Observable<League[]> {
    let params = new HttpParams().set("userId", this.getUserId());
    return this.http.get<League[]>(this.userLeagueUrl, { params: params });
  }

  getLeaguesWithKind(kind: string): Observable<League[]> {
    let params = new HttpParams().set("userId", this.getUserId()).set('kind', kind);
    return this.http.get<League[]>(this.userLeagueUrl, { params: params });
  }

  getLeaguePublic(date: number): Observable<League> {
    let params = new HttpParams().set("date", String(date));
    return this.http.get<League>(this.userLeagueUrl, { params: params });
  }

  getLeague(date: number): Observable<League> {
    let params = new HttpParams().set("date", String(date)).set("userId", this.getUserId());
    return this.http.get<League>(this.userLeagueUrl, { params: params });
  }

  createLeague(league: League): Observable<League> {
    return this.http.post<League>(this.userLeagueUrl, league);
  }

  updateLeague(league: League): Observable<League> {
    return this.http.put<League>(this.userLeagueUrl, league);
  }

  deleteLeague(date: number): Observable<Object> {
    let params = new HttpParams().set("date", String(date)).set("userId", this.getUserId());
    return this.http.delete(this.userLeagueUrl, { params: params });
  }
}
