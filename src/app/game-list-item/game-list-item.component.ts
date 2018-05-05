import { GameDescription } from '../model/gamedescription';
import { Utils } from '../utils/utils';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent implements OnInit {

  @Input() gameDescription: GameDescription;

  constructor(private utils: Utils) { }

  ngOnInit() {
  }

  getMatchUrl(): string {
    return `/game/${this.gameDescription.date}`;
  }

}
