export class StatisticsGroup {
  globalStatistics: Statistics;
  userStatistics: Statistics;
}

export class Statistics {
  gameStatistics: Count[];
  teamStatistics: Count[];
}

export class Count {
  kind: string;
  count: number;
}
