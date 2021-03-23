import { Component } from '@angular/core';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.scss']
})
export class LinksBarComponent {

  facebookUrl: string;
  playUrl:     string;

  constructor() {
    this.facebookUrl = 'https://www.facebook.com/VolleyballReferee/';
    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
  }

  getPrivacyPolicyUrl(): string {
    return '/privacy-policy';
  }
}
