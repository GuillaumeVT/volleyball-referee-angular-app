import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Count } from 'src/app/shared/models/count.model';

import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user:                   UserSummary;
  numberOfFriendRequests: number;
  currentPage:            number;
  showScrollToTop:        boolean;

  showSearch:  boolean;
  searchToken: string;
  searchDate:  Date;
  minDate:     Date;

  constructor(private userService: UserService) {
    this.numberOfFriendRequests = 0;
    this.currentPage = -1;
    this.showScrollToTop = false;

    this.showSearch = false;
    this.searchToken = '';
    this.searchDate = new Date();
    this.minDate = new Date(2019, 1, 1, 0, 0, 0);
  }

  ngOnInit() {
    this.userService.authState.subscribe(userToken => {
      if (userToken) {
        this.user = userToken.user;
        this.refreshNotifications();
      } else {
        this.user = null;
        this.numberOfFriendRequests = 0;
      }
    });
  }

  openDrawer(): void {
    document.getElementById("drawer").style.width = "300px";
    document.getElementById("overlay").style.display = "block";
  }

  closeDrawer(): void {
    if (document.getElementById("overlay").style.display === "block") {
      document.getElementById("drawer").style.width = "0px";
      document.getElementById("overlay").style.display = "none";
    }
  }

  setCurrentPage(event: any): void {
    if (event && event.getPageNumber) {
      this.currentPage = event.getPageNumber();
    } else {
      this.currentPage = -1;
    }
  }

  refreshNotifications(): void {
    setTimeout(() => this.userService.getNumberOfFriendRequestsReceivedBy().subscribe(
      (count: Count) => this.numberOfFriendRequests = count.count,
      _error => this.numberOfFriendRequests = 0
    ), 0);
  }

  getHomeUrl(): string {
    return '/home';
  }

  getSearchUrl(): string {
    return '/search';
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

  getUserAccountUrl(): string {
    return '/account';
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
