import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Series} from '../../../domain/model/series.entity';
import {SeriesCard} from '../series-card/series-card';

@Component({
  selector: 'app-series-list',
  imports: [SeriesCard],
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesList {
  readonly series = input.required<ReadonlyArray<Series>>();
  readonly listLabel = input<string>('');
  readonly seriesDetailsRequested = output<Series>();

  protected readonly eagerImageCount = 3;
}
