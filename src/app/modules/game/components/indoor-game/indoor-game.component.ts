import { AbstractGameComponent } from 'src/app/modules/game/components/abstract-game.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-indoor-game',
  templateUrl: './indoor-game.component.html',
  styleUrls: ['./indoor-game.component.scss'],
})
export class IndoorGameComponent extends AbstractGameComponent {}
