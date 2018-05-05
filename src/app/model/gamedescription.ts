import { UserId } from './userid';

export class GameDescription {
  userId:   UserId;
  kind:     string;
  date:     number;
  schedule: number;
  gender:   string;
  usage:    string;
  status:   string;
  referee:  string;
  league:   string;
  hName:    string;
  gName:    string;
  hSets:    number;
  gSets:    number;
  rules:    string;
}
