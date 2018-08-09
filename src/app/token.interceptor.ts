import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { SocialUser } from './login/entities/user';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  user:            SocialUser;
  signedIn:        boolean;

  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signedIn = (user != null);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.signedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user.idToken}`,
          AuthenticationProvider: this.user.provider.toLowerCase()
        }
      });
    }
    return next.handle(request);
  }
}
