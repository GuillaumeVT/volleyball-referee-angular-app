import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

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
        this.router.navigateByUrl('/home');
        return false;
      } else {
        return true;
      }
  }

}
