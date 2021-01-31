import { PlayerStyleService } from 'src/app/shared/services/player-style.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-picker-modal',
  templateUrl: './color-picker-modal.component.html',
  styleUrls: ['./color-picker-modal.component.css']
})
export class ColorPickerModalComponent implements OnInit {

  @Input() selectedColor: string;
  @Output() okClicked = new EventEmitter();

  colors: string[];

  constructor(private activeModal: NgbActiveModal, public playerStyleService: PlayerStyleService) {
    this.colors = [
      "#2980b9","#3b5999","#034694", "#052443", "#006032", "#6a1b9a", "#c2185b", "#bc0019", "#e25618", "#f3bc07", "#ffffff", "#0d1017", "#000000"
    ];
  }

  ngOnInit() { }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  close(): void {
    this.activeModal.close();
  }

  ok(): void {
    this.okClicked.emit(this.selectedColor);
    this.close();
  }
}
