import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserSummary, FriendRequest, FriendsAndRequests, EmailCredentials, UserToken, UserPasswordUpdate } from '../model/user';
import { Count } from '../model/count';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.api + '/users';
  private publicUsersUrl = environment.api + '/public/users';

  private _authState: BehaviorSubject<UserToken>;
  private userToken:  UserToken;

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = JSON.parse(localStorage.getItem('vbrAuth'));
    this._authState = new BehaviorSubject<UserToken>(this.userToken);
  }

  public get authState(): Observable<UserToken> {
    return this._authState.asObservable();
  }

  interceptUserToken(userToken: UserToken) {
    if (userToken && userToken.token && userToken.user) {
      this.userToken = userToken;
      localStorage.setItem('vbrAuth', JSON.stringify(this.userToken));
      this._authState.next(this.userToken);
      this.router.navigateByUrl('/home');
    }
    return userToken;
  }

  signIn(emailCredentials: EmailCredentials): Observable<UserToken> {
    const url = `${this.publicUsersUrl}/token`;
    return this.http.post<UserToken>(url, emailCredentials).pipe(map(userToken => this.interceptUserToken(userToken)));
  }

  signOut() {
    localStorage.removeItem('vbrAuth');
    this.userToken = null;
    this._authState.next(null);
    setTimeout(() => this.router.navigateByUrl('/sign-in'));
  }

  initiatePasswordReset(userEmail: string): Observable<Object> {
    const url = `${this.publicUsersUrl}/password/recover/${userEmail}`;
    return this.http.post<Object>(url, userEmail);
  }

  resetPassword(passwordResetId: string, userPassword: string): Observable<UserToken> {
    const url = `${this.publicUsersUrl}/password/reset/${passwordResetId}`;
    return this.http.post<UserToken>(url, { userPassword: userPassword }).pipe(map(userToken => this.interceptUserToken(userToken)));
  }

  updateUserPassword(userPasswordUpdate: UserPasswordUpdate): Observable<UserToken> {
    const url = `${this.usersUrl}/password`;
    return this.http.post<UserToken>(url, userPasswordUpdate).pipe(map(userToken => this.interceptUserToken(userToken)));
  }

  listFriendRequestsSentBy(): Observable<FriendRequest[]> {
    const url = `${this.usersUrl}/friends/requested`;
    return this.http.get<FriendRequest[]>(url);
  }

  listFriendRequestsReceivedBy(): Observable<FriendRequest[]> {
    const url = `${this.usersUrl}/friends/received`;
    return this.http.get<FriendRequest[]>(url);
  }

  listFriendsAndRequests(): Observable<FriendsAndRequests> {
    const url = `${this.usersUrl}/friends`;
    return this.http.get<FriendsAndRequests>(url);
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
