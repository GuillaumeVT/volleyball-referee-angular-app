import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminnGuard implements CanActivate {
  isAdmin: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isAdmin = false;
    this.userService.authState.subscribe((auth) => {
      this.isAdmin = auth != null && auth.user.admin === true;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAdmin) {
      return true;
    } else {
      this.userService.setRedirectUrlAfterLogin(state.url);
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
