import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '@shared/models/team.model';

@Component({
  selector: 'app-player-names-dialog',
  templateUrl: './player-names-dialog.component.html',
  styleUrls: ['./player-names-dialog.component.scss'],
})
export class PlayerNamesDialogComponent {
  constructor(private _dialogRef: MatDialogRef<PlayerNamesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Team) {}

  close(): void {
    this._dialogRef.close();
  }
}
