import { AbstractGameComponent } from '../abstract-game.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-beach-game',
  templateUrl: './beach-game.component.html',
  styleUrls: ['./beach-game.component.css']
})
export class BeachGameComponent extends AbstractGameComponent {

}
