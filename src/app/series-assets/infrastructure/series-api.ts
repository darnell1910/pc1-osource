import {HttpClient} from '@angular/common/http';
import {inject, Service} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Series} from '../domain/model/series.entity';
import {SeriesSearchTerm} from '../domain/model/series-search-term';
import {SearchSeriesResponse} from './search-series-response';
import {SeriesAssembler} from './series-assembler';
import {SeriesResource} from './series-resource';

/**
 * Infrastructure gateway to the TVmaze API.
 *
 * @remarks
 * Sends requests with `HttpClient` to the search and show endpoints and returns domain
 * entities, delegating the request building and the response mapping to the
 * `SeriesAssembler`.
 *
 * @author Darnell Apellido
 */
@Service()
export class SeriesApi {
  /** HTTP client used to call the provider. */
  private readonly http = inject(HttpClient);
  /** Assembler that maps provider contracts and domain objects. */
  private readonly assembler = inject(SeriesAssembler);
  /** Absolute URL of the search endpoint. */
  private readonly searchEndpointUrl =
    `${environment.seriesProviderApiBaseUrl}${environment.seriesProviderSearchEndpointPath}`;
  /** Absolute URL of the shows endpoint. */
  private readonly showsEndpointUrl =
    `${environment.seriesProviderApiBaseUrl}${environment.seriesProviderShowsEndpointPath}`;

  /**
   * Retrieves the series that match a search term.
   *
   * @param searchTerm - Term whose series will be retrieved.
   * @returns An observable that emits the series ordered by relevance.
   */
  getSeriesBySearchTerm(searchTerm: SeriesSearchTerm): Observable<Series[]> {
    const request = this.assembler.toRequestFromSearchTerm(searchTerm);
    return this.http.get<SearchSeriesResponse>(this.searchEndpointUrl, {
      params: {q: request.q}
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );
  }

  /**
   * Retrieves the details of a series.
   *
   * @param seriesId - TVmaze show identifier.
   * @returns An observable that emits the series.
   */
  getSeriesById(seriesId: number): Observable<Series> {
    return this.http.get<SeriesResource>(`${this.showsEndpointUrl}/${seriesId}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource))
    );
  }
}
