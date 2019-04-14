import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  @Input() selectedIndex: number;

  constructor() { }

  ngOnInit() {
  }

  getLinkClass(index: number): string {
    if (this.selectedIndex === index) {
      return 'btn vbr-button-selected';
    } else {
      return 'btn vbr-button-unselected';
    }
  }

  getHomeUrl(): string {
    return '/home';
  }

  getUserLeaguesUrl(): string {
    return '/leagues';
  }

  getUserRulesUrl(): string {
    return '/rules';
  }

  getUserTeamsUrl(): string {
    return '/teams';
  }

  getUserGamesUrl(): string {
    return '/games';
  }

  getUserColleaguesUrl(): string {
    return '/colleagues';
  }

}
