import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';


export function getTranslationProviders(): Promise<Object[]> {
  // Get the locale id from the global
  let cookieService = new CookieService();

  let locale = cookieService.get('language');
  if (!locale) {
    locale = navigator.language;
  }
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || (locale != 'fr')) {
    return Promise.resolve(noProviders);
  }
  cookieService.put('language', locale);
  const translationFile = '/static/locale/messages_' + locale + '.xlf';
  return getTranslationsWithSystemJs(translationFile)
    .then( (translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

declare var System: any;
function getTranslationsWithSystemJs(file: string) {
  return System.import(file + '!text'); // relies on text plugin
}