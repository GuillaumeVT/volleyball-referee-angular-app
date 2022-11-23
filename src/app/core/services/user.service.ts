import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmailCredentials, FriendRequest, FriendsAndRequests, UserPasswordUpdate, UserToken } from '@core/models/user.model';
import { Count } from '@shared/models/count.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usersUrl = environment.api + '/users';
  private _publicUsersUrl = environment.api + '/public/users';

  private _authState: BehaviorSubject<UserToken>;
  private _userToken: UserToken;
  private _redirectUrlAfterLogin: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this._userToken = JSON.parse(localStorage.getItem('vbrUserToken'));
    if (this._userToken) {
      // Check that the token is not expired
      const now = new Date();
      const nowMillis = now.getTime() + now.getTimezoneOffset() * 60000;
      if (nowMillis > this._userToken.tokenExpiry) {
        localStorage.removeItem('vbrUserToken');
        this._userToken = null;
      }
    }
    this._authState = new BehaviorSubject<UserToken>(this._userToken);
  }

  public get authState(): Observable<UserToken> {
    return this._authState.asObservable();
  }

  private interceptUserToken(userToken: UserToken): UserToken {
    if (userToken && userToken.token && userToken.user) {
      this._userToken = userToken;
      localStorage.setItem('vbrUserToken', JSON.stringify(this._userToken));
      this._authState.next(this._userToken);
      if (this._redirectUrlAfterLogin) {
        this._router.navigateByUrl(this._redirectUrlAfterLogin);
        this._redirectUrlAfterLogin = null;
      } else {
        this._router.navigateByUrl('/home');
      }
    }
    return userToken;
  }

  public signIn(emailCredentials: EmailCredentials): Observable<UserToken> {
    const url = `${this._publicUsersUrl}/token`;
    return this._http.post<UserToken>(url, emailCredentials).pipe(map((userToken) => this.interceptUserToken(userToken)));
  }

  public signOut() {
    localStorage.removeItem('vbrUserToken');
    this._userToken = null;
    this._authState.next(null);
    setTimeout(() => this._router.navigateByUrl('/sign-in'));
  }

  public initiatePasswordReset(userEmail: string): Observable<Object> {
    const url = `${this._publicUsersUrl}/password/recover/${userEmail}`;
    return this._http.post<Object>(url, userEmail);
  }

  public resetPassword(passwordResetId: string, userPassword: string): Observable<UserToken> {
    const url = `${this._publicUsersUrl}/password/reset/${passwordResetId}`;
    return this._http.post<UserToken>(url, { userPassword: userPassword }).pipe(map((userToken) => this.interceptUserToken(userToken)));
  }

  public updateUserPassword(userPasswordUpdate: UserPasswordUpdate): Observable<UserToken> {
    const url = `${this._usersUrl}/password`;
    return this._http.patch<UserToken>(url, userPasswordUpdate).pipe(map((userToken) => this.interceptUserToken(userToken)));
  }

  public listFriendRequestsSentBy(): Observable<FriendRequest[]> {
    const url = `${this._usersUrl}/friends/requested`;
    return this._http.get<FriendRequest[]>(url);
  }

  public listFriendRequestsReceivedBy(): Observable<FriendRequest[]> {
    const url = `${this._usersUrl}/friends/received`;
    return this._http.get<FriendRequest[]>(url);
  }

  public listFriendsAndRequests(): Observable<FriendsAndRequests> {
    const url = `${this._usersUrl}/friends`;
    return this._http.get<FriendsAndRequests>(url);
  }

  public getNumberOfFriendRequestsReceivedBy(): Observable<Count> {
    const url = `${this._usersUrl}/friends/received/count`;
    return this._http.get<Count>(url);
  }

  public sendFriendRequest(receiverPseudo: string): Observable<Object> {
    const url = `${this._usersUrl}/friends/request/${receiverPseudo}`;
    return this._http.post<Object>(url, {});
  }

  public acceptFriendRequest(id: string): Observable<Object> {
    const url = `${this._usersUrl}/friends/accept/${id}`;
    return this._http.post<Object>(url, {});
  }

  public rejectFriendRequest(id: string): Observable<Object> {
    const url = `${this._usersUrl}/friends/reject/${id}`;
    return this._http.post<Object>(url, {});
  }

  public removeFriend(friendId: string): Observable<Object> {
    const url = `${this._usersUrl}/friends/remove/${friendId}`;
    return this._http.delete(url);
  }

  public setRedirectUrlAfterLogin(url: string): void {
    this._redirectUrlAfterLogin = url;
  }
}
