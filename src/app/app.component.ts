import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenavContent } from '@angular/material/sidenav';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public user: UserSummary;

  @ViewChild('sideNavContent') private _sideNavContent: MatSidenavContent;
  private _scrollSubscription: Subscription;

  @ViewChild('scrollToTopButton') private _scrollToTopButton: MatButton;

  public desktopNav: boolean;

  public commonNavItems: NavItem[];
  public dataNavItems: NavItem[];
  public adminNavItems: NavItem[];

  constructor(private _userService: UserService, private _mediaMatcher: MediaMatcher) {
    this.desktopNav = !_mediaMatcher.matchMedia('(max-width: 800px)').matches;
    this.commonNavItems = [
      { label: 'menu.item.home', url: '/home' },
      { label: 'menu.item.search', url: '/search' },
    ];
  }

  public ngOnInit(): void {
    this._userService.authState.subscribe((userToken) => {
      if (userToken) {
        this.user = userToken.user;
        this.dataNavItems = [
          { label: 'menu.item.leagues', url: '/leagues' },
          { label: 'menu.item.games', url: '/games' },
          { label: 'menu.item.teams', url: '/teams' },
          { label: 'menu.item.rules', url: '/rules' },
          { label: 'menu.item.colleagues', url: '/colleagues' },
        ];

        if (this.user.admin) {
          this.adminNavItems = [{ label: 'menu.item.users', url: '/admin/users' }];
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

  public ngAfterViewInit(): void {
    this.computeScrollToTop();

    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
    }
    this._scrollSubscription = this._sideNavContent.elementScrolled().subscribe((event) => this.computeScrollToTop());
  }

  public ngOnDestroy(): void {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
    }
  }

  private computeScrollToTop() {
    this._scrollToTopButton._elementRef.nativeElement.style.visibility =
      this._sideNavContent.measureScrollOffset('top') > 100 ? 'visible' : 'hidden';
  }

  public scrollToTop(): void {
    this._sideNavContent.scrollTo({ top: 0 });
  }
}

interface NavItem {
  label: string;
  url: string;
}
