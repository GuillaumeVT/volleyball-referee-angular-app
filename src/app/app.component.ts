import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  user: UserSummary;
  
  @ViewChild('sideNavContent') sideNavContent: MatSidenavContent;
  scrollSubscription: Subscription;  
  showScrollToTop: boolean;

  @ViewChild('scrollToTopButton') scrollToTopButton: MatButton;

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
 
  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.computeScrollToTop();
    
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    this.scrollSubscription = this.sideNavContent.elementScrolled().subscribe(event => this.computeScrollToTop());
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  computeScrollToTop() {
    this.scrollToTopButton._elementRef.nativeElement.style.visibility = (this.sideNavContent.measureScrollOffset('top') > 100) ? 'visible' : 'hidden';
  }

  scrollToTop(): void {
    this.sideNavContent.scrollTo({ top: 0 });
  }
}

interface NavItem {
  label: string;
  url: string;
}
