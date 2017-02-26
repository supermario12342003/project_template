import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getTranslationProviders } from './_services/i18n-providers';
import { AppModule } from './app.module';

getTranslationProviders().then(providers => {
  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});