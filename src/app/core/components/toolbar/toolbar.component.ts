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
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnChanges {

  @Input() user: UserSummary;
  @Input() sideNav: MatSidenav;

  darkTheme: string;
  numberOfFriendRequests: number;

  constructor(private userService: UserService, private router: Router, private renderer: Renderer2, private overlayContainer: OverlayContainer) {
    this.darkTheme = 'dark-theme';
    this.numberOfFriendRequests = 0;

    if (localStorage.getItem(this.darkTheme)) {
      this.onSelectDarkTheme();
    } else {
      this.onSelectLightTheme();
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
      (count: Count) => this.numberOfFriendRequests = count.count,
      _error => this.numberOfFriendRequests = 0
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

  onSelectLightTheme(): void {
    this.renderer.removeClass(document.body, this.darkTheme);
    this.overlayContainer.getContainerElement().classList.remove(this.darkTheme);
    localStorage.removeItem(this.darkTheme);
  }

  onSelectDarkTheme(): void {
    this.renderer.addClass(document.body, this.darkTheme);
    this.overlayContainer.getContainerElement().classList.add(this.darkTheme);
    localStorage.setItem(this.darkTheme, 'true');
  }
}
