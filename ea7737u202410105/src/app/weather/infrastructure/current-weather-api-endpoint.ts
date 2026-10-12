import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {CurrentWeather} from '../domain/model/current-weather';
import {CurrentWeatherRequest} from './current-weather.request';
import {CurrentWeatherResponse} from './current-weather.response';
import {CurrentWeatherAssembler} from './current-weather-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for the forecast endpoint of the external weather provider.
 */
export class CurrentWeatherApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly endpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;
  private readonly assembler = new CurrentWeatherAssembler();

  /**
   * Creates an instance of CurrentWeatherApiEndpoint.
   * @param http - HttpClient used to perform the requests.
   */
  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Retrieves the current weather of a location.
   * @param request - Coordinates and current variables to query.
   * @returns Stream with the current weather. Fails when the response does not include a valid temperature.
   */
  getCurrentWeather(request: CurrentWeatherRequest): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('latitude', request.latitude)
      .set('longitude', request.longitude)
      .set('current', request.current);
    return this.http.get<CurrentWeatherResponse>(this.endpointUrl, {params}).pipe(
      catchError(this.handleError('Failed to fetch current weather')),
      map(response => this.assembler.toEntityFromResponse(response)),
      switchMap(currentWeather => currentWeather.hasValidTemperature
        ? of(currentWeather)
        : throwError(() => new Error('Invalid current temperature')))
    );
  }
}
