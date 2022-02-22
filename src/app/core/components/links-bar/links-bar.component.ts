import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.scss'],
})
export class LinksBarComponent {
  currentLanguage: string;
  languages: Map<string, string>;

  playUrl: string;

  constructor(private translate: TranslateService) {
    this.languages = new Map();
    this.languages.set('en', 'English');
    this.languages.set('fr', 'Français');

    this.currentLanguage = localStorage.getItem('language');

    if (!this.currentLanguage) {
      this.currentLanguage = this.translate.getBrowserLang();
    }

    this.translate.use(this.currentLanguage.match(/en|fr/) ? this.currentLanguage : 'en');

    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
  }

  getPrivacyPolicyUrl(): string {
    return '/privacy-policy';
  }

  onSelectionChanged(): void {
    localStorage.setItem('language', this.currentLanguage);
    this.translate.use(this.currentLanguage);
  }
}
