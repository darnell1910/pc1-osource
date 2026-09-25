import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {SeriesAssetsStore} from '../../../application/series-assets.store';
import {Series} from '../../../domain/model/series.entity';
import {SeriesSearchTerm} from '../../../domain/model/series-search-term';
import {SeriesSearchTermSelector} from '../../components/series-search-term-selector/series-search-term-selector';
import {SeriesList} from '../../components/series-list/series-list';
import {
  SeriesDetailsDialog,
  SeriesDetailsDialogData
} from '../../components/series-details-dialog/series-details-dialog';

@Component({
  selector: 'app-series-catalogue',
  imports: [SeriesSearchTermSelector, SeriesList, MatProgressBar, MatButton, MatIcon, TranslatePipe],
  templateUrl: './series-catalogue.html',
  styleUrl: './series-catalogue.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesCatalogue implements OnInit {
  private readonly store = inject(SeriesAssetsStore);
  private readonly dialog = inject(MatDialog);

  protected readonly searchTerms = this.store.searchTerms;
  protected readonly selectedSearchTerm = this.store.selectedSearchTerm;
  protected readonly series = this.store.selectedSearchTermSeries;
  protected readonly loadStatus = this.store.selectedSearchTermLoadStatus;

  ngOnInit(): void {
    this.store.loadSelectedSearchTermSeries();
  }

  protected onSearchTermSelected(searchTerm: SeriesSearchTerm): void {
    this.store.selectSearchTerm(searchTerm);
  }

  protected retryLoading(): void {
    this.store.loadSelectedSearchTermSeries();
  }

  protected openSeriesDetails(series: Series): void {
    this.dialog.open<SeriesDetailsDialog, SeriesDetailsDialogData>(SeriesDetailsDialog, {
      data: {seriesId: series.id, seriesName: series.name},
      width: '760px',
      maxWidth: '95vw',
      autoFocus: 'dialog'
    });
  }
}
