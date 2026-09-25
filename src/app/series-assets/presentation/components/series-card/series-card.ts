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
  readonly series = input.required<Series>();
  readonly eagerImageLoading = input<boolean>(false);
  readonly detailsRequested = output<Series>();

  protected readonly genresLabelKey = computed(
    () => this.series().hasMultipleGenres ? 'series-card.genres' : 'series-card.genre'
  );

  protected requestDetails(): void {
    this.detailsRequested.emit(this.series());
  }
}
