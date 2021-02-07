import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showInfo(message: string, duration: number): void {
    this.snackBar.open(message, '', { panelClass: ['info-snackbar'], duration: duration, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  showError(message: string, duration: number): void {
    this.snackBar.open(message, '', { panelClass: ['error-snackbar'], duration: duration, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }  
}
