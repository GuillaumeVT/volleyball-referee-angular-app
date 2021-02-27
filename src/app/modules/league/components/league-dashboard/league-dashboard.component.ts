import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { GameSummary } from 'src/app/shared/models/game.model';
import { League } from 'src/app/shared/models/league.model';
import { PublicService } from 'src/app/shared/services/public.service';

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-league-dashboard',
  templateUrl: './league-dashboard.component.html',
  styleUrls: ['./league-dashboard.component.css']
})
export class LeagueDashboardComponent implements OnDestroy, OnChanges {

  @Input() league: League;

  selectedDivision: string;
  allDivisions:     string;
  liveGames:        GameSummary[];
  next10Games:      GameSummary[];
  last10Games:      GameSummary[];
  subscription:     Subscription;
  autoRefresh:      boolean;

  constructor(private publicService: PublicService) {
    this.allDivisions = "All pools / divisions";
    this.selectedDivision = this.allDivisions;
    this.liveGames = [];
    this.next10Games = [];
    this.last10Games = [];
    this.autoRefresh = true;
  }

  ngOnChanges(_changes: SimpleChanges) {
    if (this.league) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, 120000).pipe(takeWhile(() => this.autoRefresh)).subscribe(() => this.refreshGames());
    }
  }

  ngOnDestroy() {
    this.autoRefresh = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshGames(): void {
    if (this.selectedDivision === this.allDivisions) {
      this.publicService.listLiveGamesInLeague(this.league.id).subscribe(games => this.liveGames = games, _error => this.liveGames = []);
      this.publicService.listNext10GamesInLeague(this.league.id).subscribe(games => this.next10Games = games, _error => this.next10Games = []);
      this.publicService.listLast10GamesInLeague(this.league.id).subscribe(games => this.last10Games = games, _error => this.last10Games = []);
    } else {
      this.publicService.listLiveGamesInDivision(this.league.id, this.selectedDivision).subscribe(games => this.liveGames = games, _error => this.liveGames = []);
      this.publicService.listNext10GamesInDivision(this.league.id, this.selectedDivision).subscribe(games => this.next10Games = games, _error => this.next10Games = []);
      this.publicService.listLast10GamesInDivision(this.league.id, this.selectedDivision).subscribe(games => this.last10Games = games, _error => this.last10Games = []);
    }
  }

  onDivisionSelected(): void {
    this.refreshGames();
  }

}
