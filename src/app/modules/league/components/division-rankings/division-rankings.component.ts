import { FileSaverService } from 'ngx-filesaver';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { League } from 'src/app/shared/models/league.model';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { PlayerStyleService } from 'src/app/shared/services/player-style.service';
import { PublicService } from 'src/app/shared/services/public.service';

import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-division-rankings',
  templateUrl: './division-rankings.component.html',
  styleUrls: ['./division-rankings.component.css']
})
export class DivisionRankingsComponent implements OnInit, OnDestroy, OnChanges {

  rankings: Ranking[];

  selectedDivision: string;
  subscription:     Subscription;
  autoRefresh:      boolean;

  @Input() league: League;

  constructor(private publicService: PublicService, private datePipe: DatePipe, public playerStyleService: PlayerStyleService, private fileSaverService: FileSaverService) {
    this.rankings = [];
  }

  ngOnInit() {
    this.autoRefresh = true;
  }

  ngOnChanges(_changes: SimpleChanges) {
    if (this.league) {
      if (!this.selectedDivision) {
        this.selectedDivision = this.league.divisions[0];
      }
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, 120000).pipe(takeWhile(() => this.autoRefresh)).subscribe(() => this.refreshRankings());
    }
  }

  ngOnDestroy() {
    this.autoRefresh = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshRankings(): void {
    if (this.selectedDivision) {
      this.publicService.listRankingsInDivision(this.league.id, this.selectedDivision).subscribe(ranking => this.rankings = ranking, _error => this.rankings = []);
    }
  }

  onDivisionSelected(): void {
    this.refreshRankings();
  }

  getDiff(diff: number): string {
    return diff > 0 ? `+${diff}` : `${diff}`;
  }

  getLineColor(index: number): string {
    return (index % 2) === 0 ? '#fff': '#e0e0e0';
  }

  downloadDivisionExcel(): void {
    this.publicService.listGamesInDivisionExcel(this.league.id, this.selectedDivision).subscribe((blob: Blob) => this.onDivisionExcelReceived(blob), _error => this.onDivisionExcelReceived(null));
  }

  onDivisionExcelReceived(blob: Blob): void {
    const dateStr = this.datePipe.transform(new Date().getTime(), 'dd_MM_yyyy__HH_mm');
    const filename = this.league.name + '_' + this.selectedDivision + '_' + dateStr + '.xlsx';
    this.fileSaverService.save(blob, filename);
  }

}
