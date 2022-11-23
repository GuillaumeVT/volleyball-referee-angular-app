import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  private _isSignedIn: boolean;

  constructor(private _userService: UserService, private _router: Router) {
    this._isSignedIn = false;
    this._userService.authState.subscribe((auth) => {
      this._isSignedIn = auth != null;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._isSignedIn) {
      this._router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }
}
