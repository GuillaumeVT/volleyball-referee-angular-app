import { Component, OnInit, Input } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { PublicService } from '../services/public.service';
import { Statistics, Count } from '../model/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input() showUserStatistics: boolean;

  statistics: Statistics;
  gameStatisticsData;
  teamStatisticsData;
  colorScheme;

  constructor(private statisticsService: StatisticsService, private publicService: PublicService) {
    this.colorScheme = { domain: ["#1f4294", "#f2bb1a", "#781fc9", "#2980b9"] };
  }

  ngOnInit() {
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
        { "name": "Indoor 6x6", "value": this.findCount("INDOOR", this.statistics.gameStatistics) },
        { "name": "Beach", "value": this.findCount("BEACH", this.statistics.gameStatistics) },
        { "name": "Indoor 4x4", "value": this.findCount("INDOOR_4X4", this.statistics.gameStatistics) },
        { "name": "Snow", "value": this.findCount("SNOW", this.statistics.gameStatistics) }
      ];

      this.teamStatisticsData = [
        { "name": "Indoor 6x6", "value": this.findCount("INDOOR", this.statistics.teamStatistics) },
        { "name": "Beach", "value": this.findCount("BEACH", this.statistics.teamStatistics) },
        { "name": "Indoor 4x4", "value": this.findCount("INDOOR_4X4", this.statistics.teamStatistics) },
        { "name": "Snow", "value": this.findCount("SNOW", this.statistics.teamStatistics) }
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
