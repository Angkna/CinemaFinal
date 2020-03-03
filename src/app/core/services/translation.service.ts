import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _translateService: TranslateService;
  private _language: string;
  public get language(): string {
    return this._language;
  }
  public set language(language:string){
    this._language = language;
    this.switch();
  }

  constructor() { }

  public init(translateService: TranslateService, injector: Injector): Promise<void> {
    this._translateService = translateService; 
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

  public switch(){
    return this._translateService.use(this._language);
  }

  public switchTo(language:string){
    return this._translateService.use(language).subscribe();
  }

}
