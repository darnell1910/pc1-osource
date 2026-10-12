import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {SportsCenterOccupancy} from '../../../domain/model/sports-center-occupancy';
import {SportsCenterSummary} from '../sports-center-summary/sports-center-summary';

/**
 * Grid list of sports center summaries with two columns on medium and large screens and one column on small screens.
 */
@Component({
  selector: 'app-sports-center-summary-list',
  imports: [MatGridListModule, SportsCenterSummary],
  templateUrl: './sports-center-summary-list.html',
  styleUrl: './sports-center-summary-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportsCenterSummaryList {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly isSmallScreen = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(state => state.matches)),
    {initialValue: false}
  );

  /**
   * Occupancies of the sports centers to display.
   */
  readonly occupancies = input.required<ReadonlyArray<SportsCenterOccupancy>>();

  /**
   * Number of grid columns according to the screen size.
   */
  protected readonly columns = computed(() => this.isSmallScreen() ? 1 : 2);
}
