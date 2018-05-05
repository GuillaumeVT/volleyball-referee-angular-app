import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ok-cancel-modal',
  templateUrl: './ok-cancel-modal.component.html',
  styleUrls: ['./ok-cancel-modal.component.css']
})
export class OkCancelModalComponent implements OnInit {

  @Input() title:   string;
  @Input() message: string;
  @Output() okClicked = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  close(): void {
    this.activeModal.close();
  }

  ok(): void {
    this.okClicked.emit(true);
    this.close();
  }

}
