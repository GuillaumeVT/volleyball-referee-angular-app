import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result-date',
  templateUrl: './search-result-date.component.html',
  styleUrls: ['./search-result-date.component.css']
})
export class SearchResultDateComponent implements OnInit {

  date: string;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle('VBR - Search Results');
  }

  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date');
    this.route.params.subscribe(params => {
       this.date = params['date'];
     })
  }

}
