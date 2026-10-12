import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {CurrentWeather} from '../domain/model/current-weather';
import {CurrentWeatherApiEndpoint} from './current-weather-api-endpoint';
import {environment} from '../../../environments/environment';

/**
 * Infrastructure facade for the external weather provider.
 */
@Service()
export class WeatherApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly currentWeatherEndpoint = new CurrentWeatherApiEndpoint(this.http);

  /**
   * Retrieves the current weather of a location.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @returns Stream with the current weather.
   */
  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.currentWeatherEndpoint.getCurrentWeather({
      latitude,
      longitude,
      current: environment.weatherProviderCurrentVariables
    });
  }
}
