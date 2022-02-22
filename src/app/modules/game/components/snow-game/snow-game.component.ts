import { Component } from '@angular/core';
import { AbstractGameComponent } from '@game/components/abstract-game.component';

@Component({
  selector: 'app-snow-game',
  templateUrl: './snow-game.component.html',
  styleUrls: ['./snow-game.component.scss'],
})
export class SnowGameComponent extends AbstractGameComponent {}
