import { Component } from '@angular/core';
import { AbstractGameComponent } from '../abstract-game.component';

@Component({
  selector: 'app-snow-game',
  templateUrl: './snow-game.component.html',
  styleUrls: ['./snow-game.component.css']
})
export class SnowGameComponent extends AbstractGameComponent {
}
