import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isSignedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isSignedIn = false;
    this.userService.authState.subscribe((auth) => {
      this.isSignedIn = auth != null;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isSignedIn) {
      return true;
    } else {
      this.userService.setRedirectUrlAfterLogin(state.url);
      this.router.navigateByUrl('/sign-in');
      return false;
    }
  }
}
