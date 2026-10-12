import {inject, Service, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {CurrentWeather} from '../domain/model/current-weather';
import {WeatherService} from '../infrastructure/weather.service';

/**
 * Holds the current weather application state queried from the external weather provider.
 */
@Service()
export class WeatherStore {
  private readonly weatherService = inject(WeatherService);
  private currentWeatherSubscription?: Subscription;
  private lastCoordinates?: { latitude: number; longitude: number };

  private readonly currentWeatherSignal = signal<CurrentWeather | null>(null);

  /**
   * Readonly signal for the last valid current weather.
   */
  readonly currentWeather = this.currentWeatherSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if the current weather is being queried.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Queries the current weather of a location, cancelling any pending query.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   */
  loadCurrentWeather = (latitude: number, longitude: number): void => {
    this.clear();
    this.lastCoordinates = {latitude, longitude};
    this.loadingSignal.set(true);
    this.currentWeatherSubscription = this.weatherService.getCurrentWeather(latitude, longitude).subscribe({
      next: currentWeather => {
        this.currentWeatherSignal.set(currentWeather);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to fetch current weather'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Repeats the last current weather query.
   */
  retry = (): void => {
    if (this.lastCoordinates) {
      this.loadCurrentWeather(this.lastCoordinates.latitude, this.lastCoordinates.longitude);
    }
  };

  /**
   * Cancels any pending query and clears the current weather state.
   */
  clear = (): void => {
    this.currentWeatherSubscription?.unsubscribe();
    this.currentWeatherSignal.set(null);
    this.loadingSignal.set(false);
    this.errorSignal.set(null);
  };

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
