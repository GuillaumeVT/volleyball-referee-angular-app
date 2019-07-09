import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.css']
})
export class LinksBarComponent implements OnInit {

  signedIn:    boolean;
  facebookUrl: string;
  playUrl:     string;

  constructor(private router: Router, private userService: UserService) {
    this.facebookUrl = 'https://www.facebook.com/VolleyballReferee/';
    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
    this.userService.authState.subscribe(userToken => this.signedIn = (userToken != null));
  }

  ngOnInit() {
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
