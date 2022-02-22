import { Observable } from 'rxjs';
import { StatisticsGroup } from 'src/app/shared/models/statistics.model';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private statisticsUrl = environment.api + '/statistics';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsGroup> {
    return this.http.get<StatisticsGroup>(this.statisticsUrl);
  }
}
