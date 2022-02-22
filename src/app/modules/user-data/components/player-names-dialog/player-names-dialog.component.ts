import { Team } from 'src/app/shared/models/team.model';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-names-dialog',
  templateUrl: './player-names-dialog.component.html',
  styleUrls: ['./player-names-dialog.component.scss'],
})
export class PlayerNamesDialogComponent {
  constructor(public dialogRef: MatDialogRef<PlayerNamesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Team) {}

  close(): void {
    this.dialogRef.close();
  }
}
