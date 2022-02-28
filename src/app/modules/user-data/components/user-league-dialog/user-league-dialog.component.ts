import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { League } from '@shared/models/league.model';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { LeagueService } from '@user-data/services/league.service';

@Component({
  selector: 'app-user-league-dialog',
  templateUrl: './user-league-dialog.component.html',
  styleUrls: ['./user-league-dialog.component.scss'],
})
export class UserLeagueDialogComponent {
  leagueFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserLeagueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public league: League,
    private leagueService: LeagueService,
    private snackBarService: SnackBarService,
    private translate: TranslateService,
  ) {
    this.leagueFormGroup = new FormGroup({
      leagueName: new FormControl('', [Validators.required]),
    });
  }

  get leagueNameFormControl() {
    return this.leagueFormGroup.get('leagueName');
  }

  close(): void {
    this.dialogRef.close(false);
  }

  onCreateLeague(): void {
    this.league.name = this.leagueNameFormControl.value;
    this.leagueService.createLeague(this.league).subscribe({
      next: (_league) => this.onValidResponse(),
      error: (_) => this.onInvalidResponse(),
    });
  }

  onValidResponse(): void {
    this.dialogRef.close(true);
  }

  onInvalidResponse(): void {
    this.translate
      .get('user.league.messages.created-error', { pseudo: this.league.name })
      .subscribe((t) => this.snackBarService.showError(t));
  }
}
