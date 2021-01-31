import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  isSignedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isSignedIn = false;
    this.userService.authState.subscribe(auth => {
      this.isSignedIn = (auth != null);
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isSignedIn) {
        return true;
      } else {
        this.userService.setRedirectUrlAfterLogin(state.url);
        this.router.navigateByUrl('/sign-in');
        return false;
      }
  }

}
