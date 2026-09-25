import {Service} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Infrastructure gateway that builds logo image URLs with the Logo.dev Logo API.
 *
 * @remarks
 * Keeps the Logo.dev base URL and publishable key out of the presentation layer. Both
 * values are read from the environment configuration.
 */
@Service()
export class LogoDevApi {
  /** Base URL of the Logo.dev image endpoint. */
  private readonly baseUrl = environment.logoProviderApiBaseUrl;
  /** Publishable key required by Logo.dev. */
  private readonly publishableKey = environment.logoProviderPublishableKey;

  /**
   * Builds the logo URL for an organization domain.
   *
   * @param domain - Organization domain, for example `tvmaze.com`.
   * @returns The absolute URL of the organization logo image.
   */
  getUrlToLogo(domain: string): string {
    return `${this.baseUrl}${encodeURIComponent(domain)}?token=${this.publishableKey}`;
  }
}
