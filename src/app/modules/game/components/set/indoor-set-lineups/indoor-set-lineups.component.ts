import { Component } from '@angular/core';
import { AbstractSetLineupsComponent } from '@game/components/set/abstract-set-lineups.component';

@Component({
  selector: 'app-indoor-set-lineups',
  templateUrl: './indoor-set-lineups.component.html',
  styleUrls: ['./indoor-set-lineups.component.scss'],
})
export class IndoorSetLineupsComponent extends AbstractSetLineupsComponent {}
