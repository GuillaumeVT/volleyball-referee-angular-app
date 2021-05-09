import { Count, Statistics } from 'src/app/shared/models/statistics.model';
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

  statistics: Statistics;
  gameStatisticsData: any;
  teamStatisticsData: any;
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

  buildStatisticsData(statistics: Statistics) {
    this.statistics = statistics;

    if (this.statistics === null) {
      this.gameStatisticsData = null;
      this.teamStatisticsData = null;
    } else {
      this.gameStatisticsData = [
        { "name": this.statisticsTranslations['common.indoor-6x6'], "value": this.findCount("INDOOR", this.statistics.gameStatistics) },
        { "name": this.statisticsTranslations['common.beach'], "value": this.findCount("BEACH", this.statistics.gameStatistics) },
        { "name": this.statisticsTranslations['common.indoor-4x4'], "value": this.findCount("INDOOR_4X4", this.statistics.gameStatistics) },
        { "name": this.statisticsTranslations['common.snow'], "value": this.findCount("SNOW", this.statistics.gameStatistics) }
      ];

      this.teamStatisticsData = [
        { "name": this.statisticsTranslations['common.indoor-6x6'], "value": this.findCount("INDOOR", this.statistics.teamStatistics) },
        { "name": this.statisticsTranslations['common.beach'], "value": this.findCount("BEACH", this.statistics.teamStatistics) },
        { "name": this.statisticsTranslations['common.indoor-4x4'], "value": this.findCount("INDOOR_4X4", this.statistics.teamStatistics) },
        { "name": this.statisticsTranslations['common.snow'], "value": this.findCount("SNOW", this.statistics.teamStatistics) }
      ];
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
