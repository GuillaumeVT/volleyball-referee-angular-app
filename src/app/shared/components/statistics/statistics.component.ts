import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Count, StatisticsGroup } from '@shared/models/statistics.model';
import { PublicService } from '@shared/services/public.service';
import { StatisticsService } from '@shared/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @Input() public showUserStatistics: boolean;

  public statisticsGroup: StatisticsGroup;
  public globalGameStatisticsData: any;
  public globalTeamStatisticsData: any;
  public userGameStatisticsData: any;
  public userTeamStatisticsData: any;
  public colorScheme: any;

  constructor(
    private _statisticsService: StatisticsService,
    private _publicService: PublicService,
    private _translateService: TranslateService,
  ) {
    this.colorScheme = { domain: ['#1f4294', '#f2bb1a', '#781fc9', '#2980b9'] };
  }

  public ngOnInit(): void {
    if (this.showUserStatistics) {
      this._statisticsService.getStatistics().subscribe({ next: (statistics) => this.buildStatisticsData(statistics) });
    } else {
      this._publicService.getStatistics().subscribe({ next: (statistics) => this.buildStatisticsData(statistics) });
    }
  }

  private buildStatisticsData(statisticsGroup: StatisticsGroup) {
    this.statisticsGroup = statisticsGroup;

    if (this.statisticsGroup === null) {
      this.globalGameStatisticsData = null;
      this.globalTeamStatisticsData = null;
      this.userGameStatisticsData = null;
      this.userTeamStatisticsData = null;
    } else {
      this._translateService.get(['common.indoor-6x6', 'common.indoor-4x4', 'common.beach', 'common.snow']).subscribe((t) => {
        this.globalGameStatisticsData = [
          {
            name: t['common.indoor-6x6'],
            value: this.findCount('INDOOR', this.statisticsGroup.globalStatistics.gameStatistics),
          },
          {
            name: t['common.beach'],
            value: this.findCount('BEACH', this.statisticsGroup.globalStatistics.gameStatistics),
          },
          {
            name: t['common.indoor-4x4'],
            value: this.findCount('INDOOR_4X4', this.statisticsGroup.globalStatistics.gameStatistics),
          },
          {
            name: t['common.snow'],
            value: this.findCount('SNOW', this.statisticsGroup.globalStatistics.gameStatistics),
          },
        ];

        this.globalTeamStatisticsData = [
          {
            name: t['common.indoor-6x6'],
            value: this.findCount('INDOOR', this.statisticsGroup.globalStatistics.teamStatistics),
          },
          {
            name: t['common.beach'],
            value: this.findCount('BEACH', this.statisticsGroup.globalStatistics.teamStatistics),
          },
          {
            name: t['common.indoor-4x4'],
            value: this.findCount('INDOOR_4X4', this.statisticsGroup.globalStatistics.teamStatistics),
          },
          {
            name: t['common.snow'],
            value: this.findCount('SNOW', this.statisticsGroup.globalStatistics.teamStatistics),
          },
        ];

        if (this.statisticsGroup?.userStatistics) {
          this.userGameStatisticsData = [
            {
              name: t['common.indoor-6x6'],
              value: this.findCount('INDOOR', this.statisticsGroup.userStatistics.gameStatistics),
            },
            {
              name: t['common.beach'],
              value: this.findCount('BEACH', this.statisticsGroup.userStatistics.gameStatistics),
            },
            {
              name: t['common.indoor-4x4'],
              value: this.findCount('INDOOR_4X4', this.statisticsGroup.userStatistics.gameStatistics),
            },
            {
              name: t['common.snow'],
              value: this.findCount('SNOW', this.statisticsGroup.userStatistics.gameStatistics),
            },
          ];

          this.userTeamStatisticsData = [
            {
              name: t['common.indoor-6x6'],
              value: this.findCount('INDOOR', this.statisticsGroup.userStatistics.teamStatistics),
            },
            {
              name: t['common.beach'],
              value: this.findCount('BEACH', this.statisticsGroup.userStatistics.teamStatistics),
            },
            {
              name: t['common.indoor-4x4'],
              value: this.findCount('INDOOR_4X4', this.statisticsGroup.userStatistics.teamStatistics),
            },
            {
              name: t['common.snow'],
              value: this.findCount('SNOW', this.statisticsGroup.userStatistics.teamStatistics),
            },
          ];
        }
      });
    }
  }

  private findCount(kind: string, counts: Count[]): number {
    var value = 0;

    for (let count of counts) {
      if (count.kind === kind) {
        value = count.count;
      }
    }

    return value;
  }
}
