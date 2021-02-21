import { LeagueService } from 'src/app/modules/user-data/services/league.service';
import { League } from 'src/app/shared/models/league.model';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-league-dialog',
  templateUrl: './user-league-dialog.component.html',
  styleUrls: ['./user-league-dialog.component.css']
})
export class UserLeagueDialogComponent {

  leagueForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserLeagueDialogComponent>, @Inject(MAT_DIALOG_DATA) public league: League, private leagueService: LeagueService, private snackBarService: SnackBarService) {
    this.leagueForm = new FormGroup({
      leagueName: new FormControl('', [Validators.required])
    });
  }

  get formLeagueName() { return this.leagueForm.get('leagueName'); }

  close(): void {
    this.dialogRef.close(false);
  }

  createLeague(): void {
    this.league.name = this.formLeagueName.value;
    this.leagueService.createLeague(this.league).subscribe(_league => this.onValidResponse(), error => this.onInvalidResponse(error));
  }

  onValidResponse(): void {
    this.dialogRef.close(true);
  }

  onInvalidResponse(_error: any): void {
    this.snackBarService.showError(`The league ${this.league.name} could not be created. Is the name already taken?`);
  }
}
