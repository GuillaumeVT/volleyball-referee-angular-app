import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.css']
})
export class LinksBarComponent implements OnInit {

  facebookUrl: string;
  playUrl:     string;

  constructor() {
    this.facebookUrl = 'https://www.facebook.com/VolleyballReferee/';
    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
  }

  ngOnInit() {
  }

}
