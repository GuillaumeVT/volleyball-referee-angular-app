import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rules, RulesSummary } from '@shared/models/rules.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private rulesUrl = environment.api + '/rules';

  constructor(private http: HttpClient) {}

  listRules(kinds: string[]): Observable<RulesSummary[]> {
    const url = `${this.rulesUrl}`;
    let params = new HttpParams();
    for (let kind of kinds) {
      params = params.append('kind', kind);
    }
    return this.http.get<RulesSummary[]>(url, { params: params });
  }

  getRules(rulesId: string): Observable<Rules> {
    const url = `${this.rulesUrl}/${rulesId}`;
    return this.http.get<Rules>(url);
  }

  getDefaultRules(kind: string): Observable<RulesSummary> {
    const url = `${this.rulesUrl}/default/kind/${kind}`;
    return this.http.get<RulesSummary>(url);
  }

  createRules(rules: Rules): Observable<Rules> {
    const url = `${this.rulesUrl}`;
    return this.http.post<Rules>(url, rules);
  }

  updateRules(rules: Rules): Observable<Rules> {
    const url = `${this.rulesUrl}`;
    return this.http.put<Rules>(url, rules);
  }

  deleteRules(rulesId: string): Observable<Object> {
    const url = `${this.rulesUrl}/${rulesId}`;
    return this.http.delete(url);
  }

  deleteAllRules(): Observable<Object> {
    const url = `${this.rulesUrl}`;
    return this.http.delete(url);
  }
}
