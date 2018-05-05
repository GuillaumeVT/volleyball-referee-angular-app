import { AbstractGameComponent } from '../game/abstract-game.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-indoor-game',
  templateUrl: './indoor-game.component.html',
  styleUrls: ['./indoor-game.component.css']
})
export class IndoorGameComponent extends AbstractGameComponent {

}
