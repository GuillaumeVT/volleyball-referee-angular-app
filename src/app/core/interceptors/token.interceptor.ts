import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserToken } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _userToken: UserToken;

  constructor(private _userService: UserService) {
    this._userService.authState.subscribe((userToken) => {
      if (userToken && userToken.token) {
        this._userToken = userToken;
      } else {
        this._userToken = null;
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._userToken.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want+
          }
        },
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === HttpStatusCode.Unauthorized && this._userToken) {
              // Check that the token is not expired
              const now = new Date();
              const nowMillis = now.getTime() + now.getTimezoneOffset() * 60000;
              if (nowMillis > this._userToken.tokenExpiry) {
                this._userService.signOut();
              }
            }
          }
        },
      }),
    );
  }
}
