import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { UserService } from './services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SearchModalComponent } from './search/search-modal/search-modal.component';
import { Count } from './model/count';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  signedIn:               boolean;
  photo:                  string;
  user:                   User;
  numberOfFriendRequests: number;
  currentPage:            number;

  showSearch:  boolean;
  searchToken: string;
  searchDate:  Date;
  minDate:     Date;

  constructor(private userService: UserService, private modalService: NgbModal, private router: Router, private datePipe: DatePipe) {
    this.signedIn = false;
    this.numberOfFriendRequests = 0;
    this.currentPage = -1;

    this.showSearch = false;
    this.searchToken = '';
    this.searchDate;
    this.minDate = new Date(2019, 1, 1, 0, 0, 0);
  }

  ngOnInit() {
    this.userService.userState.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.signedIn = this.userService.isSignedIn();
        this.photo = this.userService.getSocialUser().photoUrl;
        this.refreshNotifications();
      } else {
        this.signedIn = false;
        this.photo = null;
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

  setCurrentPage(event): void {
    if (event && event.getPageNumber) {
      this.currentPage = event.getPageNumber();
    } else {
      this.currentPage = -1;
    }
  }

  refreshNotifications(): void {
    setTimeout(() => this.userService.getNumberOfFriendRequestsReceivedBy().subscribe(
      count => this.numberOfFriendRequests = count.count,
      error => this.numberOfFriendRequests = 0
    ), 0);
  }

  onShowSearchClicked(): void {
    const modalRef = this.modalService.open(SearchModalComponent, { size: 'lg' });
  }

  onToggleSearchClicked(): void {
    this.showSearch = !this.showSearch;
  }

  onSearchTokenClicked(): void {
    if (this.searchToken && this.searchToken.length > 2) {
      this.router.navigateByUrl(`search/token/${this.searchToken}`);
    }
  }

  onSearchLiveClicked(): void {
    this.router.navigateByUrl('search/live');
  }

  onSearchTodayClicked(): void {
    const dateStr = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.router.navigateByUrl(`search/date/${dateStr}`);
  }

  onSearchDateClicked(): void {
    if (this.searchDate) {
      const dateStr = this.datePipe.transform(this.searchDate, 'yyyy-MM-dd');
      this.router.navigateByUrl(`search/date/${dateStr}`);
    }
  }

  getHomeUrl(): string {
    return '/home';
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

}
