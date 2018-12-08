import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocialUser } from '../login/entities/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  searchDate:  Date;
  minDate:     Date;
  searchShown: boolean;
  image:       string;

  constructor(private router: Router, private authService: AuthService, private datePipe: DatePipe) {
    this.searchShown = false;
    this.searchDate = new Date();
    this.minDate = new Date(2018, 1, 1, 0, 0, 0);
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.image = user.photoUrl;
      } else {
        this.image = null;
      }
    });
  }

  onShowSearchClicked(): void {
    this.searchShown = !this.searchShown;
  }

  onSearchTokenClicked(searchedToken: HTMLInputElement): void {
    if (searchedToken.value.trim() && searchedToken.value.length > 2) {
      this.router.navigateByUrl(`search/${searchedToken.value}`);
    }
  }

  getHomeUrl(): string {
    return '/search';
  }

  getLiveUrl(): string {
    return '/search/live';
  }

  onSearchDateClicked(): void {
    if (this.searchDate) {
      const dateStr = this.datePipe.transform(this.searchDate, 'dd-MM-yyyy');
      this.router.navigateByUrl(`search/date/${dateStr}`);
    }
  }

  getUserUrl(): string {
    return '/user';
  }

}
