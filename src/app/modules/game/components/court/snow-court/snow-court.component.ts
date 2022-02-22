import { Component } from '@angular/core';
import { IndoorCourtComponent } from '@game/components/court/indoor-court/indoor-court.component';

@Component({
  selector: 'app-snow-court',
  templateUrl: './snow-court.component.html',
  styleUrls: ['./snow-court.component.scss'],
})
export class SnowCourtComponent extends IndoorCourtComponent {}
