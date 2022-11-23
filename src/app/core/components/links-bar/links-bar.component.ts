import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.scss'],
})
export class LinksBarComponent {
  public currentLanguage: string;
  public languages: Map<string, string>;

  public playUrl: string;

  constructor(private _translateService: TranslateService) {
    this.languages = new Map();
    this.languages.set('en', 'English');
    this.languages.set('fr', 'Français');

    this.currentLanguage = localStorage.getItem('language');

    if (!this.currentLanguage) {
      this.currentLanguage = this._translateService.getBrowserLang();
    }

    this._translateService.use(this.currentLanguage.match(/en|fr/) ? this.currentLanguage : 'en');

    this.playUrl = 'https://play.google.com/store/apps/details?id=com.tonkar.volleyballreferee';
  }

  public getPrivacyPolicyUrl(): string {
    return '/privacy-policy';
  }

  public onSelectionChanged(): void {
    localStorage.setItem('language', this.currentLanguage);
    this._translateService.use(this.currentLanguage);
  }
}
