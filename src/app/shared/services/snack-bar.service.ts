import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showInfo(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: ['vbr-info-snackbar'],
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: ['vbr-error-snackbar'],
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
