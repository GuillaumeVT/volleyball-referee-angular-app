import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  searchToken: string;
  searchDate:  Date;
  minDate:     Date;

  constructor(private activeModal: NgbActiveModal, private router: Router, private datePipe: DatePipe) {
    this.searchToken = '';
    this.searchDate;
    this.minDate = new Date(2019, 1, 1, 0, 0, 0);
  }

  ngOnInit() {
  }

  onSearchTokenClicked(): void {
    if (this.searchToken && this.searchToken.length > 2) {
      this.router.navigateByUrl(`search/token/${this.searchToken}`);
      this.close();
    }
  }

  onSearchLiveClicked(): void {
    this.router.navigateByUrl('search/live');
    this.close();
  }

  onSearchDateClicked(): void {
    if (this.searchDate) {
      const dateStr = this.datePipe.transform(this.searchDate, 'yyyy-MM-dd');
      this.router.navigateByUrl(`search/date/${dateStr}`);
      this.close();
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
