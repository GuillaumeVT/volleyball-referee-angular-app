import { GameService } from '../game.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  dateModel:Date;
  image:    string;

  constructor(private titleService: Title, private router: Router, private authService: AuthService, private datePipe: DatePipe) {
    this.titleService.setTitle('Volleyball Referee - Search');
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

  onSearchTokenClicked(searchedToken: HTMLInputElement): void {
    if (searchedToken.value.trim() && searchedToken.value.length > 2) {
      this.router.navigateByUrl(`search/${searchedToken.value}`);
    }
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

  getPrivatePolicyUrl(): string {
    return '/private-policy';
  }

}
