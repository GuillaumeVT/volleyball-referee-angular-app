import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user:                   UserSummary;
  showScrollToTop:        boolean;

  desktopNav: boolean;

  commonNavItems: NavItem[];
  dataNavItems:   NavItem[];

  constructor(private userService: UserService, media: MediaMatcher) {
    this.desktopNav = !media.matchMedia('(max-width: 800px)').matches;
    this.showScrollToTop = false;
    this.commonNavItems = [
      { label: 'Home', url: '/home' },
      { label: 'Search games', url: '/search' }
    ];
  }

  ngOnInit() {
    this.userService.authState.subscribe(userToken => {
      if (userToken) {
        this.user = userToken.user;
        this.dataNavItems = [
          { label: 'Tournaments & Leagues', url: '/leagues' },
          { label: 'Games', url: '/games' },
          { label: 'Teams', url: '/teams' },
          { label: 'Rules', url: '/rules' },
          { label: 'Colleagues', url: '/colleagues' }
        ];
      } else {
        this.user = null;
        this.dataNavItems = [];
      }
    });
  }

  @HostListener('window:scroll')
  computeScrollToTop() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollToTop = scrollPosition >= 50;
  }

  scrollToTop(): void {
    window.scroll({ top: 0, left: 0 });
  }

}

interface NavItem {
  label: string;
  url: string;
}
