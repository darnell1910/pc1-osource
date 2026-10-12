import {inject, Service, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {WeatherApi} from '../infrastructure/weather-api';
import {CurrentWeather} from '../domain/model/current-weather';

/**
 * Holds the current weather state queried from the external weather provider.
 */
@Service()
export class WeatherStore {
  private readonly weatherApi = inject(WeatherApi);
  private currentWeatherSubscription?: Subscription;
  private lastCoordinates?: { latitude: number; longitude: number };

  private readonly currentWeatherSignal = signal<CurrentWeather | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal with the last valid current weather.
   */
  readonly currentWeather = this.currentWeatherSignal.asReadonly();

  /**
   * Readonly signal indicating whether the current weather is being queried.
   */
  readonly loading = this.loadingSignal.asReadonly();

  /**
   * Readonly signal with the error message of the last query.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Queries the current weather of a location, cancelling any pending query.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   */
  loadCurrentWeather(latitude: number, longitude: number): void {
    this.clear();
    this.lastCoordinates = {latitude, longitude};
    this.loadingSignal.set(true);
    this.currentWeatherSubscription = this.weatherApi.getCurrentWeather(latitude, longitude).subscribe({
      next: currentWeather => {
        this.currentWeatherSignal.set(currentWeather);
        this.loadingSignal.set(false);
      },
      error: (error: unknown) => {
        this.errorSignal.set(error instanceof Error ? error.message : 'Failed to fetch current weather');
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Repeats the last current weather query.
   */
  retry(): void {
    if (this.lastCoordinates) {
      this.loadCurrentWeather(this.lastCoordinates.latitude, this.lastCoordinates.longitude);
    }
  }

  /**
   * Cancels any pending query and clears the current weather state.
   */
  clear(): void {
    this.currentWeatherSubscription?.unsubscribe();
    this.currentWeatherSignal.set(null);
    this.loadingSignal.set(false);
    this.errorSignal.set(null);
  }
}
