import {Service} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Url} from '../../shared/domain/model/url';
import {Series} from '../domain/model/series.entity';
import {SeriesSearchTerm} from '../domain/model/series-search-term';
import {SearchSeriesRequest} from './search-series-request';
import {SearchSeriesResponse} from './search-series-response';
import {SeriesResource} from './series-resource';

@Service()
export class SeriesAssembler {
  private readonly searchLimit = environment.seriesProviderSearchLimit;

  toRequestFromSearchTerm(searchTerm: SeriesSearchTerm): SearchSeriesRequest {
    return {q: searchTerm.query};
  }

  toEntityFromResource(resource: SeriesResource): Series {
    return new Series(
      resource.id,
      resource.name ?? '',
      resource.type ?? null,
      resource.language ?? null,
      resource.genres ?? [],
      resource.status ?? null,
      resource.rating?.average ?? null,
      resource.runtime ?? resource.averageRuntime ?? null,
      resource.premiered ?? null,
      resource.ended ?? null,
      resource.network?.name ?? resource.webChannel?.name ?? null,
      this.toPlainText(resource.summary),
      this.toUrl(resource.image?.medium),
      this.toUrl(resource.officialSite),
      this.toUrl(resource.url)
    );
  }

  toEntitiesFromResponse(response: SearchSeriesResponse): Series[] {
    return (response ?? [])
      .map(result => result.show)
      .filter(resource => Number.isInteger(resource?.id) && resource.id > 0)
      .slice(0, this.searchLimit)
      .map(resource => this.toEntityFromResource(resource));
  }

  private toUrl(value: string | null | undefined): Url {
    return value && Url.isValid(value) ? new Url(value) : new Url();
  }

  private toPlainText(html: string | null | undefined): string {
    if (!html) {
      return '';
    }
    const document = new DOMParser().parseFromString(html, 'text/html');
    return (document.body.textContent ?? '').replace(/\s+/g, ' ').trim();
  }
}
