import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _language: string;
  constructor() { }

  public init(translateService: TranslateService, injector: Injector): Promise<void> {
    return new Promise<void>( (resolve: any) => {
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then( () => {
        const userLanguage: string = window.navigator.language.split('-')[0];
        this._language = /(fr|en)/gi.test(userLanguage)? userLanguage : 'en';
        translateService.use(this._language).subscribe(() => {
          console.log(`Translations loaded from ${this._language}`);
          resolve(null);
        });
      });
    });
  }
}
