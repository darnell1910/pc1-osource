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

export interface SeriesDetailsDialogData {
  seriesId: number;
  seriesName: string;
}

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
  private readonly store = inject(SeriesAssetsStore);

  protected readonly data = inject<SeriesDetailsDialogData>(MAT_DIALOG_DATA);
  protected readonly series = computed<Series | undefined>(
    () => this.store.seriesDetailsById()[this.data.seriesId]
  );
  protected readonly loadStatus = computed<LoadStatus>(
    () => this.store.detailsLoadStatusById()[this.data.seriesId] ?? 'idle'
  );

  ngOnInit(): void {
    this.store.loadSeriesDetails(this.data.seriesId);
  }

  protected retryLoading(): void {
    this.store.loadSeriesDetails(this.data.seriesId);
  }
}
