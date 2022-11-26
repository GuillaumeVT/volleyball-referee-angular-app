import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  public leagueFormGroup: UntypedFormGroup;

  constructor(
    private _dialogRef: MatDialogRef<UserLeagueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public league: League,
    private _leagueService: LeagueService,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    this.leagueFormGroup = new UntypedFormGroup({
      leagueName: new UntypedFormControl('', [Validators.required]),
    });
  }

  get leagueNameFormControl() {
    return this.leagueFormGroup.get('leagueName');
  }

  public close(): void {
    this._dialogRef.close(false);
  }

  public onCreateLeague(): void {
    this.league.name = this.leagueNameFormControl.value;
    this._leagueService.createLeague(this.league).subscribe({
      next: (_league) => this.onValidResponse(),
      error: (_) => this.onInvalidResponse(),
    });
  }

  private onValidResponse(): void {
    this._dialogRef.close(true);
  }

  private onInvalidResponse(): void {
    this._translateService
      .get('user.league.messages.created-error', { pseudo: this.league.name })
      .subscribe((t) => this._snackBarService.showError(t));
  }
}
