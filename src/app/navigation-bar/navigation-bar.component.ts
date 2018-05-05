import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  dateModel:   Date;
  searchShown: boolean;
  image:       string;

  constructor(private router: Router, private authService: AuthService, private datePipe: DatePipe) {
    this.searchShown = false;
    this.dateModel = new Date();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
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
    if (this.dateModel) {
      const dateStr = this.datePipe.transform(this.dateModel, 'dd-MM-yyyy');
      this.router.navigateByUrl(`search/date/${dateStr}`);
    }
  }

  getUserUrl(): string {
    return '/user';
  }

}
