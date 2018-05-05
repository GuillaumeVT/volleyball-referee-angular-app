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
      return 'btn vbr-button';
    } else {
      return 'btn vbr-button-inverted';
    }
  }

  getUserDashboardUrl(): string {
    return '/user';
  }

  getUserLeaguesUrl(): string {
    return '/user/leagues';
  }

  getUserRulesUrl(): string {
    return '/user/rules';
  }

  getUserTeamsUrl(): string {
    return '/user/teams';
  }

  getUserGamesUrl(): string {
    return '/user/games';
  }

}
