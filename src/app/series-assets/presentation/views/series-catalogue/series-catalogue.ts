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

/**
 * Main view that presents the Series Catalogue.
 *
 * @remarks
 * Container component that connects the presentation components with the
 * `SeriesAssetsStore`. It shows the search term selector (Star and Love) and, depending
 * on the loading status of the selected search term, a progress indicator, an error
 * message with a retry action, an empty message or the list of series cards. It also
 * opens the series details dialog requested from a card.
 */
@Component({
  selector: 'app-series-catalogue',
  imports: [SeriesSearchTermSelector, SeriesList, MatProgressBar, MatButton, MatIcon, TranslatePipe],
  templateUrl: './series-catalogue.html',
  styleUrl: './series-catalogue.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesCatalogue implements OnInit {
  /** State of the Series Assets bounded context. */
  private readonly store = inject(SeriesAssetsStore);
  /** Dialog service used to show the series details. */
  private readonly dialog = inject(MatDialog);

  /** Search terms available in the catalogue. */
  protected readonly searchTerms = this.store.searchTerms;
  /** Search term currently selected. */
  protected readonly selectedSearchTerm = this.store.selectedSearchTerm;
  /** Series of the selected search term. */
  protected readonly series = this.store.selectedSearchTermSeries;
  /** Loading status of the selected search term. */
  protected readonly loadStatus = this.store.selectedSearchTermLoadStatus;

  /** Loads the series of the default search term when the view is initialized. */
  ngOnInit(): void {
    this.store.loadSelectedSearchTermSeries();
  }

  /**
   * Handles the selection of a search term.
   *
   * @param searchTerm - Search term chosen by the user.
   */
  protected onSearchTermSelected(searchTerm: SeriesSearchTerm): void {
    this.store.selectSearchTerm(searchTerm);
  }

  /** Retries loading the series of the selected search term after a failure. */
  protected retryLoading(): void {
    this.store.loadSelectedSearchTermSeries();
  }

  /**
   * Opens the dialog with the additional information of a series.
   *
   * @param series - Series whose details were requested.
   */
  protected openSeriesDetails(series: Series): void {
    this.dialog.open<SeriesDetailsDialog, SeriesDetailsDialogData>(SeriesDetailsDialog, {
      data: {seriesId: series.id, seriesName: series.name},
      width: '760px',
      maxWidth: '95vw',
      autoFocus: 'dialog'
    });
  }
}
