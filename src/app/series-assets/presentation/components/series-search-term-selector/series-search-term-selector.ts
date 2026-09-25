import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {SeriesSearchTerm} from '../../../domain/model/series-search-term';

@Component({
  selector: 'app-series-search-term-selector',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './series-search-term-selector.html',
  styleUrl: './series-search-term-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesSearchTermSelector {
  readonly searchTerms = input.required<ReadonlyArray<SeriesSearchTerm>>();
  readonly selectedSearchTerm = input.required<SeriesSearchTerm>();
  readonly searchTermSelected = output<SeriesSearchTerm>();

  protected onSelectionChange(event: MatButtonToggleChange): void {
    this.searchTermSelected.emit(SeriesSearchTerm.fromId(event.value));
  }
}
