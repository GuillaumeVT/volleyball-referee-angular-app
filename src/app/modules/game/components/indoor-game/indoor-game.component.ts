import { Component } from '@angular/core';
import { AbstractGameComponent } from '@game/components/abstract-game.component';

@Component({
  selector: 'app-indoor-game',
  templateUrl: './indoor-game.component.html',
  styleUrls: ['./indoor-game.component.scss'],
})
export class IndoorGameComponent extends AbstractGameComponent {}
