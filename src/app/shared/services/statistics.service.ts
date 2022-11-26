import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsGroup } from '@shared/models/statistics.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private _statisticsUrl = environment.api + '/statistics';

  constructor(private _http: HttpClient) {}

  public getStatistics(): Observable<StatisticsGroup> {
    return this._http.get<StatisticsGroup>(this._statisticsUrl);
  }
}
