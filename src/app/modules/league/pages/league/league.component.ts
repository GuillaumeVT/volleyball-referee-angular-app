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
  private _leagueId: string;
  public league: League;

  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute,
    private _publicService: PublicService,
    private _translateService: TranslateService,
  ) {
    this._translateService.get('league.page').subscribe((t) => this._titleService.setTitle(t));
  }

  public ngOnInit(): void {
    this._leagueId = this._activatedRoute.snapshot.paramMap.get('leagueId');

    if (this._leagueId) {
      this._publicService.getLeague(this._leagueId).subscribe((league) => this.onLeagueUpdated(league));
    }
  }

  private onLeagueUpdated(league: League): void {
    this.league = league;
  }
}
