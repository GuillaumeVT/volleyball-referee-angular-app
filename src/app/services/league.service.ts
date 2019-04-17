import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { League } from '../model/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private leaguesUrl = environment.api + '/leagues';

  constructor(private http: HttpClient) { }

  listLeagues(): Observable<League[]> {
    const url = `${this.leaguesUrl}`;
    return this.http.get<League[]>(url);
  }

  listLeaguesOfKind(kind: string): Observable<League[]> {
    const url = `${this.leaguesUrl}/kind/${kind}`;
    return this.http.get<League[]>(url);
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
}
