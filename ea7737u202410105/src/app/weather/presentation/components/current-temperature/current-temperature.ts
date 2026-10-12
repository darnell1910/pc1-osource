import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {CurrentWeather} from '../../../domain/model/current-weather';

/**
 * Displays the current temperature of a location together with its loading and error states.
 */
@Component({
  selector: 'app-current-temperature',
  imports: [DecimalPipe, MatButton, MatIcon, MatProgressSpinner, TranslatePipe],
  templateUrl: './current-temperature.html',
  styleUrl: './current-temperature.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentTemperature {
  /**
   * Current weather to display, or null when it is not available.
   */
  readonly currentWeather = input<CurrentWeather | null>(null);

  /**
   * Indicates whether the current weather is being queried.
   */
  readonly loading = input<boolean>(false);

  /**
   * Indicates whether the last query failed.
   */
  readonly hasError = input<boolean>(false);

  /**
   * Emits when the user requests to repeat the query.
   */
  readonly retry = output<void>();
}
