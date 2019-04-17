import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserExistsGuard implements CanActivate {

  hasUser: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.hasUser = false;
    this.userService.userState.subscribe(user => {
      this.hasUser = (user != null);
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.hasUser) {
        return true;
      } else {
        this.router.navigateByUrl('home');
        return false;
      }
  }

}
