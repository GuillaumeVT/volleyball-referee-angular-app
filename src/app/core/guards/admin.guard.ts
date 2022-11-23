import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminnGuard implements CanActivate {
  private _isAdmin: boolean;

  constructor(private _userService: UserService, private _router: Router) {
    this._isAdmin = false;
    this._userService.authState.subscribe((auth) => {
      this._isAdmin = auth != null && auth.user.admin === true;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._isAdmin) {
      return true;
    } else {
      this._userService.setRedirectUrlAfterLogin(state.url);
      this._router.navigateByUrl('/home');
      return false;
    }
  }
}
