import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { SocialUser } from '../login/entities/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Count } from '../model/count';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  photo: string;
  numberOfFriendRequests: number;

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private modalService: NgbModal) {
    this.numberOfFriendRequests = 0;
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.photo = user.photoUrl;
        this.refreshNotifications();
      } else {
        this.photo = null;
      }
    });
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

  getHomeUrl(): string {
    return '/home';
  }

  getUserColleaguesUrl(): string {
    return '/colleagues';
  }

}
