import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {SeriesSearchTerm} from '../../../domain/model/series-search-term';

/**
 * Presentation component that lets the user choose a series search term.
 *
 * @remarks
 * Renders one toggle button per search term (Star and Love) and notifies the parent view
 * when the selection changes.
 */
@Component({
  selector: 'app-series-search-term-selector',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './series-search-term-selector.html',
  styleUrl: './series-search-term-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesSearchTermSelector {
  /** Search terms that can be selected. */
  readonly searchTerms = input.required<ReadonlyArray<SeriesSearchTerm>>();
  /** Search term currently selected. */
  readonly selectedSearchTerm = input.required<SeriesSearchTerm>();
  /** Event emitted when the user selects a search term. */
  readonly searchTermSelected = output<SeriesSearchTerm>();

  /**
   * Emits the search term chosen in the toggle group.
   *
   * @param event - Change event emitted by the toggle group.
   */
  protected onSelectionChange(event: MatButtonToggleChange): void {
    this.searchTermSelected.emit(SeriesSearchTerm.fromId(event.value));
  }
}
