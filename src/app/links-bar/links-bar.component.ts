import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocialUser } from '../login/entities/user';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.css']
})
export class LinksBarComponent implements OnInit {

  socialUser:  SocialUser;
  signedIn:    boolean;
  facebookUrl: string;
  playUrl:     string;

  constructor(private authService: AuthService) {
    this.facebookUrl = 'https://www.facebook.com/VolleyballReferee/';
    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
    this.authService.authState.subscribe(socialUser => {
      this.socialUser = socialUser;
      this.signedIn = (socialUser != null);
    });
  }

  ngOnInit() {
  }

  getPrivatePolicyUrl(): string {
    return '/private-policy';
  }

  signOut(): void {
    this.authService.signOut();
  }

}
