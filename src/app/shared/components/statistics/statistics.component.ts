import { Count, Statistics, StatisticsGroup } from 'src/app/shared/models/statistics.model';
import { PublicService } from 'src/app/shared/services/public.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';

import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() showUserStatistics: boolean;

  statisticsGroup: StatisticsGroup;
  globalGameStatisticsData: any;
  globalTeamStatisticsData: any;
  userGameStatisticsData: any;
  userTeamStatisticsData: any;
  colorScheme: any;

  statisticsTranslations: any;

  constructor(private statisticsService: StatisticsService, private publicService: PublicService, private translate: TranslateService) {
    this.colorScheme = { domain: ["#1f4294", "#f2bb1a", "#781fc9", "#2980b9"] };
  }

  ngOnInit() {
    this.translate
      .get(['common.indoor-6x6', 'common.indoor-4x4', 'common.beach', 'common.snow'])
      .subscribe(t => this.statisticsTranslations = t);
    
    if (this.showUserStatistics) {
      this.statisticsService.getStatistics().subscribe(statistics => this.buildStatisticsData(statistics));
    } else {
      this.publicService.getStatistics().subscribe(statistics => this.buildStatisticsData(statistics));
    }
  }

  buildStatisticsData(statisticsGroup: StatisticsGroup) {
    this.statisticsGroup = statisticsGroup;

    if (this.statisticsGroup === null) {
      this.globalGameStatisticsData = null;
      this.globalTeamStatisticsData = null;
      this.userGameStatisticsData = null;
      this.userTeamStatisticsData = null;
    } else {
      this.globalGameStatisticsData = [
        { "name": this.statisticsTranslations['common.indoor-6x6'], "value": this.findCount("INDOOR", this.statisticsGroup.globalStatistics.gameStatistics) },
        { "name": this.statisticsTranslations['common.beach'], "value": this.findCount("BEACH", this.statisticsGroup.globalStatistics.gameStatistics) },
        { "name": this.statisticsTranslations['common.indoor-4x4'], "value": this.findCount("INDOOR_4X4", this.statisticsGroup.globalStatistics.gameStatistics) },
        { "name": this.statisticsTranslations['common.snow'], "value": this.findCount("SNOW", this.statisticsGroup.globalStatistics.gameStatistics) }
      ];

      this.globalTeamStatisticsData = [
        { "name": this.statisticsTranslations['common.indoor-6x6'], "value": this.findCount("INDOOR", this.statisticsGroup.globalStatistics.teamStatistics) },
        { "name": this.statisticsTranslations['common.beach'], "value": this.findCount("BEACH", this.statisticsGroup.globalStatistics.teamStatistics) },
        { "name": this.statisticsTranslations['common.indoor-4x4'], "value": this.findCount("INDOOR_4X4", this.statisticsGroup.globalStatistics.teamStatistics) },
        { "name": this.statisticsTranslations['common.snow'], "value": this.findCount("SNOW", this.statisticsGroup.globalStatistics.teamStatistics) }
      ];

      if (this.statisticsGroup?.userStatistics) {
        this.userGameStatisticsData = [
          { "name": this.statisticsTranslations['common.indoor-6x6'], "value": this.findCount("INDOOR", this.statisticsGroup.userStatistics.gameStatistics) },
          { "name": this.statisticsTranslations['common.beach'], "value": this.findCount("BEACH", this.statisticsGroup.userStatistics.gameStatistics) },
          { "name": this.statisticsTranslations['common.indoor-4x4'], "value": this.findCount("INDOOR_4X4", this.statisticsGroup.userStatistics.gameStatistics) },
          { "name": this.statisticsTranslations['common.snow'], "value": this.findCount("SNOW", this.statisticsGroup.userStatistics.gameStatistics) }
        ];
  
        this.userTeamStatisticsData = [
          { "name": this.statisticsTranslations['common.indoor-6x6'], "value": this.findCount("INDOOR", this.statisticsGroup.userStatistics.teamStatistics) },
          { "name": this.statisticsTranslations['common.beach'], "value": this.findCount("BEACH", this.statisticsGroup.userStatistics.teamStatistics) },
          { "name": this.statisticsTranslations['common.indoor-4x4'], "value": this.findCount("INDOOR_4X4", this.statisticsGroup.userStatistics.teamStatistics) },
          { "name": this.statisticsTranslations['common.snow'], "value": this.findCount("SNOW", this.statisticsGroup.userStatistics.teamStatistics) }
        ];
      }
    }
  }

  findCount(kind: string, counts: Count[]): number {
    var value = 0;

    for (let count of counts) {
      if (count.kind === kind) {
        value = count.count;
      }
    }

    return value;
  }

}
