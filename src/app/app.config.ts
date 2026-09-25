import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';

/**
 * Root-level providers for change detection, HTTP communication and i18n.
 *
 * @remarks
 * English is the default and fallback language. Translation files are loaded over HTTP
 * from the path configured in the environment.
 *
 * @author Darnell Apellido
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideTranslateService({
      lang: environment.defaultLanguage,
      fallbackLang: environment.defaultLanguage,
      loader: provideTranslateHttpLoader({
        prefix: environment.i18nResourcesPath,
        suffix: environment.i18nResourcesExtension
      })
    })
  ]
};
