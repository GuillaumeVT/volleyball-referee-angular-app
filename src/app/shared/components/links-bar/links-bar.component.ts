import { UserService } from 'src/app/core/services/user.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.css']
})
export class LinksBarComponent {

  signedIn:    boolean;
  facebookUrl: string;
  playUrl:     string;

  constructor(private router: Router, private userService: UserService) {
    this.facebookUrl = 'https://www.facebook.com/VolleyballReferee/';
    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
    this.userService.authState.subscribe(userToken => this.signedIn = (userToken != null));
  }

  getPrivacyPolicyUrl(): string {
    return '/privacy-policy';
  }

  getHomeUrl(): string {
    return '/home';
  }

  signOut(): void {
    this.userService.signOut();
    this.router.navigateByUrl('home');
  }

}
