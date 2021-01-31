import { League } from 'src/app/shared/models/league.model';
import { PublicService } from 'src/app/shared/services/public.service';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  leagueId:         string;
  league:           League;
  selectedIndex:    number;

  constructor(private titleService: Title, private route: ActivatedRoute, private publicService: PublicService) {
    this.titleService.setTitle('VBR - View League');
    this.selectedIndex = 0;
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('leagueId');

    if (this.leagueId) {
      this.publicService.getLeague(this.leagueId).subscribe(league => this.onLeagueUpdated(league));
    }
  }

  onLeagueUpdated(league: League): void  {
    this.league = league;
  }

  getLinkClass(index: number): string {
    if (this.selectedIndex === index) {
      return 'btn vbr-button-selected';
    } else {
      return 'btn vbr-button-unselected';
    }
  }

  showDashboard(): void  {
    this.selectedIndex = 0;
  }

  showRankings(): void  {
    this.selectedIndex = 1;
  }

  showGames(): void  {
    this.selectedIndex = 2;
  }

}
