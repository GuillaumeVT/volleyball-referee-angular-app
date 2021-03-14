import { SearchComponent } from 'src/app/modules/search/pages/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
