import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './model/user';
import { FriendRequest } from './model/friend-request';
import { Count } from './model/count';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.api + '/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    const url = `${this.usersUrl}`;
    return this.http.get<User>(url);
  }

  listFriendRequestsSentBy(): Observable<FriendRequest[]> {
    const url = `${this.usersUrl}/friends/requested`;
    return this.http.get<FriendRequest[]>(url);
  }

  listFriendRequestsReceivedBy(): Observable<FriendRequest[]> {
    const url = `${this.usersUrl}/friends/received`;
    return this.http.get<FriendRequest[]>(url);
  }

  getNumberOfFriendRequestsReceivedBy(): Observable<Count> {
    const url = `${this.usersUrl}/friends/received/count`;
    return this.http.get<Count>(url);
  }

  sendFriendRequest(receiverPseudo: string): Observable<Object> {
    const url = `${this.usersUrl}/friends/request/${receiverPseudo}`;
    return this.http.post<Object>(url, {});
  }

  acceptFriendRequest(id: string): Observable<Object> {
    const url = `${this.usersUrl}/friends/accept/${id}`;
    return this.http.post<Object>(url, {});
  }

  rejectFriendRequest(id: string): Observable<Object> {
    const url = `${this.usersUrl}/friends/reject/${id}`;
    return this.http.post<Object>(url, {});
  }

  removeFriend(friendId: string): Observable<Object> {
    const url = `${this.usersUrl}/friends/remove/${friendId}`;
    return this.http.delete(url);
  }

}
