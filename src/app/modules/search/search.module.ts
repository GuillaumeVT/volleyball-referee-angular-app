import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from '@search/pages/search/search.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, BrowserModule, SharedModule],
  exports: [SearchComponent],
})
export class SearchModule {}
