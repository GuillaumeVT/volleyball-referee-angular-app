import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerStyleService } from '@shared/services/player-style.service';

@Component({
  selector: 'app-color-picker-dialog',
  templateUrl: './color-picker-dialog.component.html',
  styleUrls: ['./color-picker-dialog.component.scss'],
})
export class ColorPickerDialogComponent {
  public selectedColor: string;
  public colors: string[];

  constructor(
    private _dialogRef: MatDialogRef<ColorPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public playerStyleService: PlayerStyleService,
  ) {
    this.selectedColor = this.data;
    this.colors = [
      '#2980b9',
      '#3b5999',
      '#034694',
      '#052443',
      '#006032',
      '#6a1b9a',
      '#c2185b',
      '#bc0019',
      '#e25618',
      '#f3bc07',
      '#ffffff',
      '#0d1017',
      '#000000',
    ];
  }

  public onSelectColor(color: string): void {
    this.selectedColor = color;
  }

  public close(): void {
    this._dialogRef.close(null);
  }

  public onApplyColor() {
    this._dialogRef.close(this.selectedColor);
  }
}
