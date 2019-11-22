import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Statistics } from '../model/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private statisticsUrl = environment.api + '/statistics';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.statisticsUrl);
  }

}
