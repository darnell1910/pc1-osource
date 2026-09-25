import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Series} from '../../../domain/model/series.entity';
import {SeriesCard} from '../series-card/series-card';

/**
 * Presentation component that renders a responsive grid of series cards.
 *
 * @remarks
 * Shows three cards per row on large screens, two on medium screens and one on small
 * screens. The list keeps its semantics for assistive technologies and forwards the
 * details requests of its cards to the parent view.
 */
@Component({
  selector: 'app-series-list',
  imports: [SeriesCard],
  templateUrl: './series-list.html',
  styleUrl: './series-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesList {
  /** Series to display. */
  readonly series = input.required<ReadonlyArray<Series>>();
  /** Accessible name of the list. */
  readonly listLabel = input<string>('');
  /** Event emitted when the user requests the details of a series. */
  readonly seriesDetailsRequested = output<Series>();

  /** Number of images loaded immediately: the first row of the grid. */
  protected readonly eagerImageCount = 3;
}
