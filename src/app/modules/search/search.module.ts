import { SearchResultDateComponent } from 'src/app/modules/search/components/search-result-date/search-result-date.component';
import { SearchResultLiveComponent } from 'src/app/modules/search/components/search-result-live/search-result-live.component';
import { SearchResultTokenComponent } from 'src/app/modules/search/components/search-result-token/search-result-token.component';
import { SearchComponent } from 'src/app/modules/search/components/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SearchComponent,
    SearchResultLiveComponent,
    SearchResultTokenComponent,
    SearchResultDateComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    SearchComponent,
    SearchResultLiveComponent,
    SearchResultTokenComponent,
    SearchResultDateComponent
  ]
})
export class SearchModule { }
