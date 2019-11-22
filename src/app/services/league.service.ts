import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { League, LeagueSummary } from '../model/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private leaguesUrl = environment.api + '/leagues';

  constructor(private http: HttpClient) { }

  listLeagues(kinds: string[]): Observable<LeagueSummary[]> {
    const url = `${this.leaguesUrl}`;
    let params = new HttpParams();
    for (let kind of kinds) {
      params = params.append("kind", kind);
    }
    return this.http.get<LeagueSummary[]>(url, { params: params });
  }

  getLeague(leagueId: string): Observable<League> {
    const url = `${this.leaguesUrl}/${leagueId}`;
    return this.http.get<League>(url);
  }

  createLeague(league: League): Observable<League> {
    const url = `${this.leaguesUrl}`;
    return this.http.post<League>(url, league);
  }

  deleteLeague(leagueId: string): Observable<Object> {
    const url = `${this.leaguesUrl}/${leagueId}`;
    return this.http.delete(url);
  }

  deleteAllLeagues(): Observable<Object> {
    const url = `${this.leaguesUrl}`;
    return this.http.delete(url);
  }
}
