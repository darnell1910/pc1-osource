import {Service} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Url} from '../../shared/domain/model/url';
import {Series} from '../domain/model/series.entity';
import {SeriesSearchTerm} from '../domain/model/series-search-term';
import {SearchSeriesRequest} from './search-series-request';
import {SearchSeriesResponse} from './search-series-response';
import {SeriesResource} from './series-resource';

/**
 * Assembler that translates between series provider contracts and domain objects.
 *
 * @remarks
 * Builds the search request for a search term and maps the series resources of the
 * responses into `Series` entities: it flattens nested objects (`image.medium`,
 * `rating.average`, `network.name`), converts the HTML summary into plain text, completes
 * missing values and keeps at most the number of results configured in the environment.
 *
 * @author Darnell Apellido
 */
@Service()
export class SeriesAssembler {
  /** Maximum number of series taken from each search response. */
  private readonly searchLimit = environment.seriesProviderSearchLimit;

  /**
   * Builds the search request for a search term.
   *
   * @param searchTerm - Term whose series will be searched.
   * @returns The request with the query parameter.
   */
  toRequestFromSearchTerm(searchTerm: SeriesSearchTerm): SearchSeriesRequest {
    return {q: searchTerm.query};
  }

  /**
   * Converts a provider series resource into a Series entity.
   *
   * @param resource - Series resource returned by the provider.
   * @returns The equivalent Series entity.
   */
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

  /**
   * Converts a search response into Series entities.
   *
   * @remarks
   * Keeps the provider relevance order and at most the configured number of results.
   * Results without a valid id cannot be identified, so they are discarded.
   *
   * @param response - Search response returned by the provider.
   * @returns The Series entities included in the response.
   */
  toEntitiesFromResponse(response: SearchSeriesResponse): Series[] {
    return (response ?? [])
      .map(result => result.show)
      .filter(resource => Number.isInteger(resource?.id) && resource.id > 0)
      .slice(0, this.searchLimit)
      .map(resource => this.toEntityFromResource(resource));
  }

  /**
   * Builds a Url value object, falling back to an empty URL when the value is missing or invalid.
   *
   * @param value - URL string returned by the provider.
   * @returns The Url value object.
   */
  private toUrl(value: string | null | undefined): Url {
    return value && Url.isValid(value) ? new Url(value) : new Url();
  }

  /**
   * Converts the HTML summary returned by the provider into plain text.
   *
   * @remarks
   * The HTML is parsed with `DOMParser`, which does not execute scripts, and only its text
   * content is kept.
   *
   * @param html - HTML summary returned by the provider.
   * @returns The summary as plain text, empty when not available.
   */
  private toPlainText(html: string | null | undefined): string {
    if (!html) {
      return '';
    }
    const document = new DOMParser().parseFromString(html, 'text/html');
    return (document.body.textContent ?? '').replace(/\s+/g, ' ').trim();
  }
}
