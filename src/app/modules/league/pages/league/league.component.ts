import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { League } from '@shared/models/league.model';
import { PublicService } from '@shared/services/public.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  leagueId: string;
  league: League;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private publicService: PublicService,
    private translate: TranslateService,
  ) {
    this.translate.get('league.page').subscribe((t) => this.titleService.setTitle(t));
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('leagueId');

    if (this.leagueId) {
      this.publicService.getLeague(this.leagueId).subscribe((league) => this.onLeagueUpdated(league));
    }
  }

  onLeagueUpdated(league: League): void {
    this.league = league;
  }
}
