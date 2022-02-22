import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionPurchase, User } from '@core/models/user.model';
import { Page } from '@shared/models/page.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminUrl = environment.api + '/admin';

  constructor(private http: HttpClient) {}

  listUsers(filter: string, page: number, size: number): Observable<Page<User>> {
    const url = `${this.adminUrl}/users`;
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    if (filter && filter.length > 0) {
      params = params.append('filter', filter);
    }
    return this.http.get<Page<User>>(url, { params: params });
  }

  getUserSubscription(userId: string): Observable<SubscriptionPurchase> {
    const url = `${this.adminUrl}/users/${userId}/subscription`;
    return this.http.get<SubscriptionPurchase>(url);
  }

  refreshUserSubscription(userId: string): Observable<void> {
    const url = `${this.adminUrl}/users/${userId}/subscription`;
    return this.http.post<void>(url, {});
  }

  updateUserSubscription(userId: string, purchaseToken: string): Observable<void> {
    const url = `${this.adminUrl}/users/${userId}/subscription/${purchaseToken}`;
    return this.http.post<void>(url, {});
  }
}
