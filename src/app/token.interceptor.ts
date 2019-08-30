import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserService } from './services/user.service';
import { UserToken } from './model/user';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  userToken: UserToken;

  constructor(private userService: UserService) {
    this.userService.authState.subscribe(userToken => {
      if (userToken && userToken.token) {
        this.userToken = userToken;
      } else {
        this.userToken = null;
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userToken.token}`
        }
      });
    }
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want+
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && this.userToken) {
          // Check that the token is not expired
          const now = new Date();
          const nowMillis = now.getTime() + (now.getTimezoneOffset() * 60000);
          if (nowMillis > this.userToken.tokenExpiry) {
            this.userService.signOut();
          }
        }
      }
    }));
  }
}
