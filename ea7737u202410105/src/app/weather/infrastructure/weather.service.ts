import {inject, Service} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {HttpClient} from '@angular/common/http';
import {CurrentWeatherApiEndpoint} from './current-weather-api-endpoint';
import {CurrentWeatherAssembler} from './current-weather-assembler';
import {CurrentWeather} from '../domain/model/current-weather';
import {Observable} from 'rxjs';

/**
 * Infrastructure facade that exposes the external weather provider operations.
 */
@Service()
export class WeatherService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly currentWeatherEndpoint = new CurrentWeatherApiEndpoint(this.http, new CurrentWeatherAssembler());

  /**
   * Retrieves the current weather of a location.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @returns Stream with the current weather.
   */
  getCurrentWeather = (latitude: number, longitude: number): Observable<CurrentWeather> =>
    this.currentWeatherEndpoint.getCurrentWeather(latitude, longitude);
}
