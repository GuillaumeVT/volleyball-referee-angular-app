import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { Count } from '@shared/models/count.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnChanges {
  @Input() public user: UserSummary;
  @Input() public sideNav: MatSidenav;

  private _themeKey: string;
  public currentTheme: string;
  public systemTheme: string;
  public lightTheme: string;
  public darkTheme: string;
  public numberOfFriendRequests: number;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _renderer: Renderer2,
    private _overlayContainer: OverlayContainer,
  ) {
    this._themeKey = 'theme';
    this.systemTheme = 'system-theme';
    this.lightTheme = 'light-theme';
    this.darkTheme = 'dark-theme';
    this.numberOfFriendRequests = 0;

    this.currentTheme = localStorage.getItem(this._themeKey);

    if (this.currentTheme) {
      if (this.currentTheme === this.systemTheme) {
        this.toggleSystemTheme();
      } else if (this.currentTheme === this.lightTheme) {
        this.toggleLightTheme();
      } else if (this.currentTheme === this.darkTheme) {
        this.toggleDarkTheme();
      }
    } else {
      this.onSelectSystemTheme();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.refreshNotifications();
    } else {
      this.numberOfFriendRequests = 0;
    }
  }

  private refreshNotifications(): void {
    this._userService.getNumberOfFriendRequestsReceivedBy().subscribe({
      next: (count: Count) => (this.numberOfFriendRequests = count.count),
      error: (_) => (this.numberOfFriendRequests = 0),
    });
  }

  public signOut(): void {
    this._userService.signOut();
    this._router.navigateByUrl('home');
  }

  public getUserAccountUrl(): string {
    return '/account';
  }

  public getUserColleaguesUrl(): string {
    return '/colleagues';
  }

  public onSelectSystemTheme(): void {
    this.toggleSystemTheme();
    localStorage.setItem(this._themeKey, this.systemTheme);
  }

  public onSelectLightTheme(): void {
    this.toggleLightTheme();
    localStorage.setItem(this._themeKey, this.lightTheme);
  }

  public onSelectDarkTheme(): void {
    this.toggleDarkTheme();
    localStorage.setItem(this._themeKey, this.darkTheme);
  }

  private toggleSystemTheme(): void {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      this.toggleDarkTheme();
    } else {
      this.toggleLightTheme();
    }
    this.currentTheme = this.systemTheme;
  }

  private toggleLightTheme(): void {
    this._renderer.removeClass(document.body, this.darkTheme);
    this._overlayContainer.getContainerElement().classList.remove(this.darkTheme);
    this.currentTheme = this.lightTheme;
  }

  private toggleDarkTheme(): void {
    this._renderer.addClass(document.body, this.darkTheme);
    this._overlayContainer.getContainerElement().classList.add(this.darkTheme);
    this.currentTheme = this.darkTheme;
  }
}
