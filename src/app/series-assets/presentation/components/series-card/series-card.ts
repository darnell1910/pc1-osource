import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {Series} from '../../../domain/model/series.entity';

/**
 * Presentation component that renders the card of one TV series.
 *
 * @remarks
 * Shows the medium-size poster at the top, the name as the main heading, the language,
 * genres, status and average rating with human-friendly labels, and a "Series Details"
 * action on the left side of the card footer that asks the parent view to show the
 * additional information of the series.
 */
@Component({
  selector: 'app-series-card',
  imports: [
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    TranslatePipe
  ],
  templateUrl: './series-card.html',
  styleUrl: './series-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesCard {
  /** Series to display. */
  readonly series = input.required<Series>();
  /** Whether the poster is loaded immediately, used for the posters visible on first load. */
  readonly eagerImageLoading = input<boolean>(false);
  /** Event emitted when the user requests the details of the series. */
  readonly detailsRequested = output<Series>();

  /** Translation key of the genres label, singular or plural. */
  protected readonly genresLabelKey = computed(
    () => this.series().hasMultipleGenres ? 'series-card.genres' : 'series-card.genre'
  );

  /** Asks the parent view to show the details of the series. */
  protected requestDetails(): void {
    this.detailsRequested.emit(this.series());
  }
}
