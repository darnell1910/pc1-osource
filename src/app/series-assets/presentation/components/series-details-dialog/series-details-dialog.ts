import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {SeriesAssetsStore} from '../../../application/series-assets.store';
import {LoadStatus} from '../../../application/load-status';
import {Series} from '../../../domain/model/series.entity';

/**
 * Data received by the series details dialog.
 *
 * @remarks
 * Only the identifier is required to request the details; the name is used as the dialog
 * title while the details are loading.
 */
export interface SeriesDetailsDialogData {
  /** TVmaze show identifier. */
  seriesId: number;
  /** Name of the series. */
  seriesName: string;
}

/**
 * Presentation component that shows the additional information of a TV series.
 *
 * @remarks
 * Opened from the "Series Details" action of a series card. It requests the series to the
 * provider show endpoint (`/shows/{id}`) through the `SeriesAssetsStore` and shows its
 * poster, summary, type, language, genres, status, premiere and end dates, runtime,
 * network, rating and links, together with loading and error states.
 */
@Component({
  selector: 'app-series-details-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,
    MatProgressBar,
    TranslatePipe
  ],
  templateUrl: './series-details-dialog.html',
  styleUrl: './series-details-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesDetailsDialog implements OnInit {
  /** State of the Series Assets bounded context. */
  private readonly store = inject(SeriesAssetsStore);

  /** Data received from the view that opened the dialog. */
  protected readonly data = inject<SeriesDetailsDialogData>(MAT_DIALOG_DATA);
  /** Details of the series, available once loaded. */
  protected readonly series = computed<Series | undefined>(
    () => this.store.seriesDetailsById()[this.data.seriesId]
  );
  /** Loading status of the details of the series. */
  protected readonly loadStatus = computed<LoadStatus>(
    () => this.store.detailsLoadStatusById()[this.data.seriesId] ?? 'idle'
  );

  /** Requests the details of the series when the dialog is opened. */
  ngOnInit(): void {
    this.store.loadSeriesDetails(this.data.seriesId);
  }

  /** Retries loading the details of the series after a failure. */
  protected retryLoading(): void {
    this.store.loadSeriesDetails(this.data.seriesId);
  }
}
