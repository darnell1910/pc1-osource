import {Service} from '@angular/core';
import {environment} from '../../../environments/environment';

@Service()
export class LogoDevApi {
  private readonly baseUrl = environment.logoProviderApiBaseUrl;
  private readonly publishableKey = environment.logoProviderPublishableKey;

  getUrlToLogo(domain: string): string {
    return `${this.baseUrl}${encodeURIComponent(domain)}?token=${this.publishableKey}`;
  }
}
