import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result-token',
  templateUrl: './search-result-token.component.html',
  styleUrls: ['./search-result-token.component.css']
})
export class SearchResultTokenComponent implements OnInit {

  token: string;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle('VBR - Search Results');
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.route.params.subscribe(params => {
       this.token = params['token'];
    });
  }

  getPageNumber(): number {
    return 6;
  }
}
