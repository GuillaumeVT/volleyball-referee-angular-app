import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-result-live',
  templateUrl: './search-result-live.component.html',
  styleUrls: ['./search-result-live.component.css']
})
export class SearchResultLiveComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('VBR - Search Results');
  }

  ngOnInit() { }

  getPageNumber(): number {
    return 6;
  }

}
