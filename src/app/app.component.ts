import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenavContent } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

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
  adminNavItems:  NavItem[];

  constructor(private userService: UserService, media: MediaMatcher) {
    this.desktopNav = !media.matchMedia('(max-width: 800px)').matches;
    this.showScrollToTop = false;
    this.commonNavItems = [
      { label: 'menu.item.home', url: '/home' },
      { label: 'menu.item.search', url: '/search' }
    ];
  }
 
  ngOnInit(): void {
    this.userService.authState.subscribe(userToken => {
      if (userToken) {
        this.user = userToken.user;
        this.dataNavItems = [
          { label: 'menu.item.leagues', url: '/leagues' },
          { label: 'menu.item.games', url: '/games' },
          { label: 'menu.item.teams', url: '/teams' },
          { label: 'menu.item.rules', url: '/rules' },
          { label: 'menu.item.colleagues', url: '/colleagues' }
        ];

        if (this.user.admin) {
          this.adminNavItems = [
            { label: 'menu.item.users', url: '/admin/users' }
          ];
        } else {
          this.adminNavItems = [];
        }
      } else {
        this.user = null;
        this.dataNavItems = [];
        this.adminNavItems = [];
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
