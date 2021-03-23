import { AbstractGameComponent } from 'src/app/modules/game/components/abstract-game.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-indoor4x4-game',
  templateUrl: './indoor4x4-game.component.html',
  styleUrls: ['./indoor4x4-game.component.scss']
})
export class Indoor4x4GameComponent extends AbstractGameComponent { }
