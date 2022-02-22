import { Component } from '@angular/core';
import { AbstractGameComponent } from 'src/app/modules/game/components/abstract-game.component';

@Component({
  selector: 'app-beach-game',
  templateUrl: './beach-game.component.html',
  styleUrls: ['./beach-game.component.scss'],
})
export class BeachGameComponent extends AbstractGameComponent {}
