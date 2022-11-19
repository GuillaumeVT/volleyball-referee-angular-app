export interface StatisticsGroup {
  globalStatistics: Statistics;
  userStatistics: Statistics;
}

export interface Statistics {
  gameStatistics: Count[];
  teamStatistics: Count[];
}

export interface Count {
  kind: string;
  count: number;
}
