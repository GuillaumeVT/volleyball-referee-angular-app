import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { League } from '@shared/models/league.model';
import { Ranking } from '@shared/models/ranking.model';
import { PlayerStyleService } from '@shared/services/player-style.service';
import { PublicService } from '@shared/services/public.service';
import { saveAs } from 'file-saver';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-division-rankings',
  templateUrl: './division-rankings.component.html',
  styleUrls: ['./division-rankings.component.scss'],
})
export class DivisionRankingsComponent implements OnInit, OnDestroy, OnChanges {
  public rankings: Ranking[];

  public selectedDivision: string;
  private _subscription: Subscription;
  private _autoRefresh: boolean;

  @Input() public league: League;

  constructor(private _publicService: PublicService, private _datePipe: DatePipe, public playerStyleService: PlayerStyleService) {
    this.rankings = [];
  }

  public ngOnInit(): void {
    this._autoRefresh = true;
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.league) {
      if (!this.selectedDivision) {
        this.selectedDivision = this.league.divisions[0];
      }
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      this._subscription = timer(0, 120000)
        .pipe(takeWhile(() => this._autoRefresh))
        .subscribe(() => this.refreshRankings());
    }
  }

  public ngOnDestroy(): void {
    this._autoRefresh = false;
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private refreshRankings(): void {
    if (this.selectedDivision) {
      this._publicService.listRankingsInDivision(this.league.id, this.selectedDivision).subscribe({
        next: (ranking) => (this.rankings = ranking),
        error: (_) => (this.rankings = []),
      });
    }
  }

  public onDivisionSelected(): void {
    this.refreshRankings();
  }

  public getDiff(diff: number): string {
    return diff > 0 ? `+${diff}` : `${diff}`;
  }

  public getLineClass(index: number): string {
    return index % 2 === 0 ? 'league-ranking-even' : 'league-ranking-odd';
  }

  public downloadDivisionExcel(): void {
    this._publicService.listGamesInDivisionExcel(this.league.id, this.selectedDivision).subscribe({
      next: (blob: Blob) => this.onDivisionExcelReceived(blob),
      error: (_) => this.onDivisionExcelReceived(null),
    });
  }

  private onDivisionExcelReceived(blob: Blob): void {
    const dateStr = this._datePipe.transform(new Date().getTime(), 'dd_MM_yyyy__HH_mm');
    const filename = this.league.name + '_' + this.selectedDivision + '_' + dateStr + '.xlsx';
    saveAs(blob, filename);
  }
}
