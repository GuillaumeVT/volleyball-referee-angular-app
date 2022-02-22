import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Count } from 'src/app/shared/models/count.model';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnChanges {
  @Input() user: UserSummary;
  @Input() sideNav: MatSidenav;

  themeKey: string;
  currentTheme: string;
  systemTheme: string;
  lightTheme: string;
  darkTheme: string;
  numberOfFriendRequests: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
    private overlayContainer: OverlayContainer,
  ) {
    this.themeKey = 'theme';
    this.systemTheme = 'system-theme';
    this.lightTheme = 'light-theme';
    this.darkTheme = 'dark-theme';
    this.numberOfFriendRequests = 0;

    this.currentTheme = localStorage.getItem(this.themeKey);

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.refreshNotifications();
    } else {
      this.numberOfFriendRequests = 0;
    }
  }

  refreshNotifications(): void {
    this.userService.getNumberOfFriendRequestsReceivedBy().subscribe(
      (count: Count) => (this.numberOfFriendRequests = count.count),
      (_error) => (this.numberOfFriendRequests = 0),
    );
  }

  signOut(): void {
    this.userService.signOut();
    this.router.navigateByUrl('home');
  }

  getUserAccountUrl(): string {
    return '/account';
  }

  getUserColleaguesUrl(): string {
    return '/colleagues';
  }

  onSelectSystemTheme(): void {
    this.toggleSystemTheme();
    localStorage.setItem(this.themeKey, this.systemTheme);
  }

  onSelectLightTheme(): void {
    this.toggleLightTheme();
    localStorage.setItem(this.themeKey, this.lightTheme);
  }

  onSelectDarkTheme(): void {
    this.toggleDarkTheme();
    localStorage.setItem(this.themeKey, this.darkTheme);
  }

  toggleSystemTheme(): void {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      this.toggleDarkTheme();
    } else {
      this.toggleLightTheme();
    }
    this.currentTheme = this.systemTheme;
  }

  toggleLightTheme(): void {
    this.renderer.removeClass(document.body, this.darkTheme);
    this.overlayContainer.getContainerElement().classList.remove(this.darkTheme);
    this.currentTheme = this.lightTheme;
  }

  toggleDarkTheme(): void {
    this.renderer.addClass(document.body, this.darkTheme);
    this.overlayContainer.getContainerElement().classList.add(this.darkTheme);
    this.currentTheme = this.darkTheme;
  }
}
