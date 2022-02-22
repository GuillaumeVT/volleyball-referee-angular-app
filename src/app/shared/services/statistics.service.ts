import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsGroup } from '@shared/models/statistics.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
