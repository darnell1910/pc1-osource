/**
 * Development environment configuration.
 *
 * @remarks
 * Centralizes provider URLs, endpoint paths, keys and i18n settings so that no route
 * or key is hard-coded in the application source code. It replaces
 * `environment.ts` when the application is built or served with the `development` configuration.
 */
export const environment = {
  production: false,
  seriesProviderApiBaseUrl: 'https://api.tvmaze.com',
  seriesProviderSearchEndpointPath: '/search/shows',
  seriesProviderShowsEndpointPath: '/shows',
  seriesProviderSearchLimit: 12,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'pk_H1j_uA9GRFizL2ikMw4qwQ',
  organizationDomain: 'tvmaze.com',
  i18nResourcesPath: './i18n/',
  i18nResourcesExtension: '.json',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es']
};
