import { LinksBarComponent } from 'src/app/core/components/links-bar/links-bar.component';
import { ToolbarComponent } from 'src/app/core/components/toolbar/toolbar.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { PageNotFoundComponent } from 'src/app/core/pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from 'src/app/core/pages/privacy-policy/privacy-policy.component';
import { MaterialModule } from 'src/app/material/material.module';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ToolbarComponent, LinksBarComponent, PageNotFoundComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    ToolbarComponent,
    LinksBarComponent,
    PrivacyPolicyComponent,
    PageNotFoundComponent,
    TranslateModule,
  ],
})
export class CoreModule {}
