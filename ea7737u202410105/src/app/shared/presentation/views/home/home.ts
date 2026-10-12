import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../../sports-centers/application/sports-centers.store';
import {SportsCenterSummaryList} from '../../../../sports-centers/presentation/components/sports-center-summary-list/sports-center-summary-list';

/**
 * Home view with the platform introduction and the summary of the sports centers.
 */
@Component({
  selector: 'app-home',
  imports: [MatButton, MatProgressBar, TranslatePipe, SportsCenterSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  /**
   * Store with the sports centers and reservations state.
   */
  protected readonly sportsCentersStore = inject(SportsCentersStore);
}
