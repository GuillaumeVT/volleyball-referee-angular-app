import { UserSubscriptionDialogComponent } from '@admin/components/user-subscription-dialog/user-subscription-dialog.component';
import { UserSubscriptionTokenDialogComponent } from '@admin/components/user-subscription-token-dialog/user-subscription-token-dialog.component';
import { AdminService } from '@admin/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { User } from '@core/models/user.model';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  public page: number;
  public size: number;
  public total: number;
  private _filter: string;

  public users: User[];

  public today: number;

  constructor(private _adminService: AdminService, private _dialog: MatDialog, private _snackBarService: SnackBarService) {
    this.page = 0;
    this.size = 50;
    this.total = 0;
    this.users = [];
    this.today = new Date().getTime();
  }

  public ngOnInit(): void {
    this.refreshUsers();
  }

  private refreshUsers(): void {
    this._adminService.listUsers(this._filter, this.page, this.size).subscribe({
      next: (page) => {
        this.total = page.totalElements;
        this.users = page.content;
      },
      error: (_) => {
        this.page = 0;
        this.total = 0;
        this.users = [];
      },
    });
  }

  public filterUsers(textFilter: HTMLInputElement): void {
    this._filter = textFilter.value;
    this.refreshUsers();
  }

  public onPageChange(event: PageEvent): void {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.refreshUsers();
  }

  public viewSubscription(user: User): void {
    this._adminService
      .getUserSubscription(user.id)
      .subscribe((subscriptionPurchase) =>
        this._dialog.open(UserSubscriptionDialogComponent, { width: '800px', data: subscriptionPurchase }),
      );
  }

  public updateUserSubscription(user: User): void {
    const dialogRef = this._dialog.open(UserSubscriptionTokenDialogComponent, { width: '500px', data: user.purchaseToken });
    dialogRef.afterClosed().subscribe((purchaseToken) => {
      if (purchaseToken) {
        this._adminService.updateUserSubscription(user.id, purchaseToken).subscribe({
          next: (_success) => {
            this._snackBarService.showInfo('Successfully updated subscription.');
            this.refreshUsers();
          },
          error: (_) => this._snackBarService.showError('Failed to updated subscription.'),
        });
      }
    });
  }

  public refreshUserSubscription(user: User): void {
    this._adminService.refreshUserSubscription(user.id).subscribe({
      next: (_success) => {
        this._snackBarService.showInfo('Successfully refreshed subscription.');
        this.refreshUsers();
      },
      error: (_) => this._snackBarService.showError('Failed to refresh subscription.'),
    });
  }
}
