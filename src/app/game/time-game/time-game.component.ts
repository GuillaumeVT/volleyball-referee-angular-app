import { AbstractGameComponent } from '../abstract-game.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-time-game',
  templateUrl: './time-game.component.html',
  styleUrls: ['./time-game.component.css']
})
export class TimeGameComponent extends AbstractGameComponent {

}
