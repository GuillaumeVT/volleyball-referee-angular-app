import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  public showInfo(message: string): void {
    this._snackBar.open(message, '', {
      panelClass: ['vbr-info-snackbar'],
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public showError(message: string): void {
    this._snackBar.open(message, '', {
      panelClass: ['vbr-error-snackbar'],
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
