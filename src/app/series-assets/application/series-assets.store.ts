import {computed, inject, Service, signal} from '@angular/core';
import {Series} from '../domain/model/series.entity';
import {SeriesSearchTerm, SeriesSearchTermId} from '../domain/model/series-search-term';
import {SeriesApi} from '../infrastructure/series-api';
import {LoadStatus} from './load-status';

/**
 * Application service that manages the state of the Series Assets bounded context.
 *
 * @remarks
 * Implements the State Management pattern with Angular signals. It keeps the selected
 * search term, a cache of series per search term, a cache of series details per id and
 * the loading status of each request, and exposes read-only projections consumed by the
 * presentation layer. Every request is sent only once; a failed request can be retried.
 *
 * @author Darnell Apellido
 */
@Service()
export class SeriesAssetsStore {
  /** Gateway to the series provider. */
  private readonly seriesApi = inject(SeriesApi);

  /** Currently selected search term. */
  private readonly selectedSearchTermSignal = signal<SeriesSearchTerm>(SeriesSearchTerm.STAR);
  /** Cache of series indexed by search term identifier. */
  private readonly seriesBySearchTermSignal = signal<Partial<Record<SeriesSearchTermId, Series[]>>>({});
  /** Loading status indexed by search term identifier. */
  private readonly loadStatusBySearchTermSignal = signal<Partial<Record<SeriesSearchTermId, LoadStatus>>>({});
  /** Cache of series details indexed by series id. */
  private readonly seriesDetailsByIdSignal = signal<Readonly<Record<number, Series>>>({});
  /** Loading status of the series details indexed by series id. */
  private readonly detailsLoadStatusByIdSignal = signal<Readonly<Record<number, LoadStatus>>>({});

  /** Search terms available in the catalogue. */
  readonly searchTerms = SeriesSearchTerm.values();
  /** Read-only projection of the selected search term. */
  readonly selectedSearchTerm = this.selectedSearchTermSignal.asReadonly();
  /** Series of the selected search term. */
  readonly selectedSearchTermSeries = computed<Series[]>(
    () => this.seriesBySearchTermSignal()[this.selectedSearchTermSignal().id] ?? []
  );
  /** Loading status of the selected search term. */
  readonly selectedSearchTermLoadStatus = computed<LoadStatus>(
    () => this.loadStatusBySearchTermSignal()[this.selectedSearchTermSignal().id] ?? 'idle'
  );
  /** Read-only projection of the series details indexed by id. */
  readonly seriesDetailsById = this.seriesDetailsByIdSignal.asReadonly();
  /** Read-only projection of the details loading status indexed by id. */
  readonly detailsLoadStatusById = this.detailsLoadStatusByIdSignal.asReadonly();

  /**
   * Selects a search term and loads its series when they are not cached yet.
   *
   * @param searchTerm - Search term chosen by the user.
   */
  selectSearchTerm(searchTerm: SeriesSearchTerm): void {
    this.selectedSearchTermSignal.set(searchTerm);
    this.loadSelectedSearchTermSeries();
  }

  /**
   * Loads the series of the selected search term.
   *
   * @remarks
   * Does nothing when the series are already loaded or a request is in progress, so it is
   * also used to retry after a failure.
   */
  loadSelectedSearchTermSeries(): void {
    const searchTerm = this.selectedSearchTermSignal();
    const loadStatus = this.loadStatusBySearchTermSignal()[searchTerm.id] ?? 'idle';
    if (loadStatus === 'loading' || loadStatus === 'loaded') {
      return;
    }
    this.updateSearchTermLoadStatus(searchTerm.id, 'loading');
    this.seriesApi.getSeriesBySearchTerm(searchTerm).subscribe({
      next: series => {
        this.seriesBySearchTermSignal.update(seriesBySearchTerm => ({...seriesBySearchTerm, [searchTerm.id]: series}));
        this.updateSearchTermLoadStatus(searchTerm.id, 'loaded');
      },
      error: error => {
        console.error(`Series of search term ${searchTerm.id} could not be loaded`, error);
        this.updateSearchTermLoadStatus(searchTerm.id, 'failed');
      }
    });
  }

  /**
   * Loads the details of a series from the provider show endpoint.
   *
   * @remarks
   * Does nothing when the details are already loaded or a request is in progress, so it is
   * also used to retry after a failure.
   *
   * @param seriesId - TVmaze show identifier.
   */
  loadSeriesDetails(seriesId: number): void {
    const loadStatus = this.detailsLoadStatusByIdSignal()[seriesId] ?? 'idle';
    if (loadStatus === 'loading' || loadStatus === 'loaded') {
      return;
    }
    this.updateDetailsLoadStatus(seriesId, 'loading');
    this.seriesApi.getSeriesById(seriesId).subscribe({
      next: series => {
        this.seriesDetailsByIdSignal.update(detailsById => ({...detailsById, [seriesId]: series}));
        this.updateDetailsLoadStatus(seriesId, 'loaded');
      },
      error: error => {
        console.error(`Details of series ${seriesId} could not be loaded`, error);
        this.updateDetailsLoadStatus(seriesId, 'failed');
      }
    });
  }

  /**
   * Updates the loading status of a search term.
   *
   * @param searchTermId - Identifier of the search term.
   * @param loadStatus - New loading status.
   */
  private updateSearchTermLoadStatus(searchTermId: SeriesSearchTermId, loadStatus: LoadStatus): void {
    this.loadStatusBySearchTermSignal.update(statusBySearchTerm => ({...statusBySearchTerm, [searchTermId]: loadStatus}));
  }

  /**
   * Updates the loading status of the details of a series.
   *
   * @param seriesId - TVmaze show identifier.
   * @param loadStatus - New loading status.
   */
  private updateDetailsLoadStatus(seriesId: number, loadStatus: LoadStatus): void {
    this.detailsLoadStatusByIdSignal.update(statusById => ({...statusById, [seriesId]: loadStatus}));
  }
}
