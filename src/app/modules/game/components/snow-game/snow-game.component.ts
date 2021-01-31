import { AbstractGameComponent } from 'src/app/modules/game/components/abstract-game.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-snow-game',
  templateUrl: './snow-game.component.html',
  styleUrls: ['./snow-game.component.css']
})
export class SnowGameComponent extends AbstractGameComponent { }
