import { User } from 'src/app/core/models/user.model';
import { UserSubscriptionDialogComponent } from 'src/app/modules/admin/components/user-subscription-dialog/user-subscription-dialog.component';
import { UserSubscriptionTokenDialogComponent } from 'src/app/modules/admin/components/user-subscription-token-dialog/user-subscription-token-dialog.component';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  page:   number;
  size:   number;
  total:  number;
  filter: string;

  users: User[];

  today: number;

  constructor(public adminService: AdminService, private dialog: MatDialog, private snackBarService: SnackBarService) {
    this.page = 0;
    this.size = 50;
    this.total = 0;
    this.users = [];
    this.today = new Date().getTime();
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers(): void {
    this.adminService.listUsers(this.filter, this.page, this.size).subscribe(
      page => {
        this.total = page.totalElements;
        this.users = page.content;
      },
      _error => {
        this.page = 0;
        this.total = 0;
        this.users = [];
      });
  }

  filterUsers(textFilter: HTMLInputElement): void {
    this.filter = textFilter.value;
    this.refreshUsers();
  }

  onPageChange(event: PageEvent): void {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.refreshUsers();
  }

  viewSubscription(user: User): void {
    this.adminService.getUserSubscription(user.id).subscribe(subscriptionPurchase => this.dialog.open(UserSubscriptionDialogComponent, { width: "800px", data: subscriptionPurchase }));
  }

  updateUserSubscription(user: User): void {
    const dialogRef = this.dialog.open(UserSubscriptionTokenDialogComponent, { width: "500px", data: user.purchaseToken });
    dialogRef.afterClosed().subscribe(purchaseToken => {
      if (purchaseToken) {
        this.adminService.updateUserSubscription(user.id, purchaseToken).subscribe(
          _success => {
            this.snackBarService.showInfo("Successfully updated subscription.");
            this.refreshUsers();
          },
          _error => this.snackBarService.showInfo("Failed to updated subscription.")
        );
      }
    });
  }

  refreshUserSubscription(user: User): void {
    this.adminService.refreshUserSubscription(user.id).subscribe(
      _success => {
        this.snackBarService.showInfo("Successfully refreshed subscription.");
        this.refreshUsers();
      },
      _error => this.snackBarService.showInfo("Failed to refresh subscription.")
    );
  }
}
