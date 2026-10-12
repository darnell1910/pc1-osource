import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCenterOccupancy} from '../../../domain/model/sports-center-occupancy';

/**
 * Card that presents a sports center with its reservations, total participants and available capacity.
 */
@Component({
  selector: 'app-sports-center-summary',
  imports: [MatCardModule, MatDivider, MatIcon, MatListModule, TranslatePipe],
  templateUrl: './sports-center-summary.html',
  styleUrl: './sports-center-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportsCenterSummary {
  /**
   * Occupancy of the sports center to display.
   */
  readonly occupancy = input.required<SportsCenterOccupancy>();
}
