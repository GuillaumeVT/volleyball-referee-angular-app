import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { SocialUser } from './services/login/entities/user';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  user:            SocialUser;
  signedIn:        boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState.subscribe(user => {
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
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.signOut();
          setTimeout(() => this.router.navigateByUrl('home'), 1000);
        }
      }
    }));
  }
}
