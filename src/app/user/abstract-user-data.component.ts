import { OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SocialUser } from '../login/entities/user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

export abstract class AbstractUserDataComponent implements OnInit {

  protected router:      Router;
  protected authService: AuthService;
  protected userService: UserService;

  public signedIn:   boolean;
  public socialUser: SocialUser;
  public user:       User;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.authService = injector.get(AuthService);
    this.userService = injector.get(UserService);
    this.signedIn = false;
  }

  ngOnInit() {
    this.authService.authState.subscribe(socialUser => {
      this.socialUser = socialUser;
      this.signedIn = (socialUser != null);

      if (this.signedIn) {
        setTimeout(() => this.userService.getUser().subscribe(
          user => {
            this.user = user;
            this.refreshData();
          },
          error => error => setTimeout(() => this.navigateToHome(), 1000)
        ), 0);
      }
    });
  }

  navigateToHome(): void {
    if (!this.signedIn) {
      this.router.navigateByUrl('home');
    }
  }

  abstract refreshData(): void;

}
