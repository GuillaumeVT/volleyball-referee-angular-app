import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Count } from 'src/app/shared/models/count.model';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnChanges {

  @Input() user: UserSummary;
  @Input() sideNav: MatSidenav;

  numberOfFriendRequests: number;

  constructor(private userService: UserService, private router: Router) {
    this.numberOfFriendRequests = 0;
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

}
