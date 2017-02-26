"use strict";
var core_1 = require('@angular/core');
var core_2 = require('angular2-cookie/core');
function getTranslationProviders() {
    // Get the locale id from the global
    var cookieService = new core_2.CookieService();
    var locale = cookieService.get('language');
    if (!locale) {
        locale = navigator.language;
    }
    var noProviders = [];
    // No locale or U.S. English: no translation providers
    if (!locale || (locale != 'fr')) {
        return Promise.resolve(noProviders);
    }
    cookieService.put('language', locale);
    var translationFile = '/static/locale/messages_' + locale + '.xlf';
    return getTranslationsWithSystemJs(translationFile)
        .then(function (translations) { return [
        { provide: core_1.TRANSLATIONS, useValue: translations },
        { provide: core_1.TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: core_1.LOCALE_ID, useValue: locale }
    ]; })
        .catch(function () { return noProviders; }); // ignore if file not found
}
exports.getTranslationProviders = getTranslationProviders;
function getTranslationsWithSystemJs(file) {
    return System.import(file + '!text'); // relies on text plugin
}
//# sourceMappingURL=i18n-providers.js.map