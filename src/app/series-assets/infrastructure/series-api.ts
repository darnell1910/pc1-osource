import {HttpClient} from '@angular/common/http';
import {inject, Service} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Series} from '../domain/model/series.entity';
import {SeriesSearchTerm} from '../domain/model/series-search-term';
import {SearchSeriesResponse} from './search-series-response';
import {SeriesAssembler} from './series-assembler';
import {SeriesResource} from './series-resource';

@Service()
export class SeriesApi {
  private readonly http = inject(HttpClient);
  private readonly assembler = inject(SeriesAssembler);
  private readonly searchEndpointUrl =
    `${environment.seriesProviderApiBaseUrl}${environment.seriesProviderSearchEndpointPath}`;
  private readonly showsEndpointUrl =
    `${environment.seriesProviderApiBaseUrl}${environment.seriesProviderShowsEndpointPath}`;

  getSeriesBySearchTerm(searchTerm: SeriesSearchTerm): Observable<Series[]> {
    const request = this.assembler.toRequestFromSearchTerm(searchTerm);
    return this.http.get<SearchSeriesResponse>(this.searchEndpointUrl, {
      params: {q: request.q}
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );
  }

  getSeriesById(seriesId: number): Observable<Series> {
    return this.http.get<SeriesResource>(`${this.showsEndpointUrl}/${seriesId}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource))
    );
  }
}
