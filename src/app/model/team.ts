import { UserId } from './userid';

export class Team {
  userId:      UserId;
  name:        string;
  kind:        string;
  date:        number;
  gender:      string;
  color:       string;
  liberoColor: string;
  players:     number[];
  liberos:     number[];
  captain:     number;
}
