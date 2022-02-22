import { Component } from '@angular/core';
import { AbstractGameComponent } from '@game/components/abstract-game.component';

@Component({
  selector: 'app-indoor4x4-game',
  templateUrl: './indoor4x4-game.component.html',
  styleUrls: ['./indoor4x4-game.component.scss'],
})
export class Indoor4x4GameComponent extends AbstractGameComponent {}
