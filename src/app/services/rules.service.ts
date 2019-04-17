import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rules } from '../model/rules';
import { RulesDescription } from '../model/rules-description';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private rulesUrl = environment.api + '/rules';

  constructor(private http: HttpClient) { }

  listRules(): Observable<RulesDescription[]> {
    const url = `${this.rulesUrl}`;
    return this.http.get<RulesDescription[]>(url);
  }

  listRulesOfKind(kind: string): Observable<RulesDescription[]> {
    const url = `${this.rulesUrl}/kind/${kind}`;
    return this.http.get<RulesDescription[]>(url);
  }

  getRules(rulesId: string): Observable<Rules> {
    const url = `${this.rulesUrl}/${rulesId}`;
    return this.http.get<Rules>(url);
  }

  getDefaultRules(kind: string): Observable<RulesDescription> {
    const url = `${this.rulesUrl}/default/kind/${kind}`;
    return this.http.get<RulesDescription>(url);
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
}
