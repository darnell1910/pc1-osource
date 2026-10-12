import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of, switchMap, throwError} from 'rxjs';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {CurrentWeather} from '../domain/model/current-weather';
import {CurrentWeatherAssembler} from './current-weather-assembler';
import {CurrentWeatherResponse} from './current-weather-response';

const currentWeatherApiEndpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;

/**
 * Encapsulates the HTTP operations of the external weather provider forecast endpoint.
 */
export class CurrentWeatherApiEndpoint extends ErrorHandlingEnabledBaseType {
  /**
   * Creates an instance of CurrentWeatherApiEndpoint.
   * @param http - The HttpClient for making HTTP requests.
   * @param assembler - The assembler for converting requests and responses.
   */
  constructor(private http: HttpClient, private assembler: CurrentWeatherAssembler) {
    super();
  }

  /**
   * Retrieves the current weather of a location.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @returns Stream with the current weather. Fails when the response does not include a valid temperature.
   */
  getCurrentWeather = (latitude: number, longitude: number): Observable<CurrentWeather> => {
    const request = this.assembler.toRequestFromCoordinates(latitude, longitude, environment.weatherProviderCurrentVariables);
    const params = new HttpParams()
      .set('latitude', request.latitude)
      .set('longitude', request.longitude)
      .set('current', request.current);
    return this.http.get<CurrentWeatherResponse>(currentWeatherApiEndpointUrl, {params}).pipe(
      catchError(this.handleError('Failed to fetch current weather')),
      map(response => this.assembler.toEntityFromResponse(response)),
      switchMap(currentWeather => currentWeather.hasValidTemperature
        ? of(currentWeather)
        : throwError(() => new Error('Failed to fetch current weather: Invalid temperature')))
    );
  };
}
