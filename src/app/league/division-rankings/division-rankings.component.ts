import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';
import { League } from '../../model/league';
import { Ranking } from '../../model/ranking';
import { PublicService } from '../../services/public.service';
import { Utils } from '../../utils/utils';

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

  constructor(private publicService: PublicService, private utils: Utils) {
    this.rankings = [];
  }

  ngOnInit() {
    this.autoRefresh = true;
  }

  ngOnChanges(changes: SimpleChanges) {
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
      this.publicService.listRankingsInDivision(this.league.id, this.selectedDivision).subscribe(ranking => this.rankings = ranking, error => this.rankings = []);
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

}
