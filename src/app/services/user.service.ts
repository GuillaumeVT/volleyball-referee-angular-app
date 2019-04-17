import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { SocialUser } from '../services/login/entities/user';
import { FriendRequest } from '../model/friend-request';
import { Count } from '../model/count';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.api + '/users';

  private signedIn: boolean;
  private socialUser: SocialUser;

  private _userState: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.signedIn = false;

    this.authService.authState.subscribe(socialUser => {
      this.socialUser = socialUser;
      this.signedIn = (this.socialUser != null);

      if (this.signedIn) {
        setTimeout(() => this.refreshUser(), 0);
      } else {
        this._userState.next(null);
      }
    });
  }

  get userState(): Observable<User> {
    return this._userState.asObservable();
  }

  isSignedIn(): boolean {
    return this.signedIn;
  }

  getSocialUser(): SocialUser {
    return this.socialUser;
  }

  getUser(): Observable<User> {
    const url = `${this.usersUrl}`;
    return this.http.get<User>(url);
  }

  refreshUser(): void {
    this.getUser().subscribe(user => this._userState.next(user), error => this._userState.next(null));
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
