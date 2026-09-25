import {computed, inject, Service, signal} from '@angular/core';
import {Series} from '../domain/model/series.entity';
import {SeriesSearchTerm, SeriesSearchTermId} from '../domain/model/series-search-term';
import {SeriesApi} from '../infrastructure/series-api';
import {LoadStatus} from './load-status';

@Service()
export class SeriesAssetsStore {
  private readonly seriesApi = inject(SeriesApi);

  private readonly selectedSearchTermSignal = signal<SeriesSearchTerm>(SeriesSearchTerm.STAR);
  private readonly seriesBySearchTermSignal = signal<Partial<Record<SeriesSearchTermId, Series[]>>>({});
  private readonly loadStatusBySearchTermSignal = signal<Partial<Record<SeriesSearchTermId, LoadStatus>>>({});
  private readonly seriesDetailsByIdSignal = signal<Readonly<Record<number, Series>>>({});
  private readonly detailsLoadStatusByIdSignal = signal<Readonly<Record<number, LoadStatus>>>({});

  readonly searchTerms = SeriesSearchTerm.values();
  readonly selectedSearchTerm = this.selectedSearchTermSignal.asReadonly();
  readonly selectedSearchTermSeries = computed<Series[]>(
    () => this.seriesBySearchTermSignal()[this.selectedSearchTermSignal().id] ?? []
  );
  readonly selectedSearchTermLoadStatus = computed<LoadStatus>(
    () => this.loadStatusBySearchTermSignal()[this.selectedSearchTermSignal().id] ?? 'idle'
  );
  readonly seriesDetailsById = this.seriesDetailsByIdSignal.asReadonly();
  readonly detailsLoadStatusById = this.detailsLoadStatusByIdSignal.asReadonly();

  selectSearchTerm(searchTerm: SeriesSearchTerm): void {
    this.selectedSearchTermSignal.set(searchTerm);
    this.loadSelectedSearchTermSeries();
  }

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

  private updateSearchTermLoadStatus(searchTermId: SeriesSearchTermId, loadStatus: LoadStatus): void {
    this.loadStatusBySearchTermSignal.update(statusBySearchTerm => ({...statusBySearchTerm, [searchTermId]: loadStatus}));
  }

  private updateDetailsLoadStatus(seriesId: number, loadStatus: LoadStatus): void {
    this.detailsLoadStatusByIdSignal.update(statusById => ({...statusById, [seriesId]: loadStatus}));
  }
}
