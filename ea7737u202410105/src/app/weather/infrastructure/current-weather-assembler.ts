import {CurrentWeather} from '../domain/model/current-weather';
import {CurrentWeatherResponse} from './current-weather-response';
import {CurrentWeatherRequest} from './current-weather.request';

/**
 * Maps current weather requests and the external weather provider responses.
 */
export class CurrentWeatherAssembler {
  /**
   * Converts the provider response into a CurrentWeather domain object.
   * @param response - Raw response returned by the forecast endpoint.
   * @returns The converted CurrentWeather.
   */
  toEntityFromResponse = (response: CurrentWeatherResponse): CurrentWeather =>
    new CurrentWeather(
      response.current.temperature_2m,
      response.current_units.temperature_2m,
      new Date(response.current.time)
    );

  /**
   * Converts coordinates into the request expected by the forecast endpoint.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @param current - Current weather variables to query.
   * @returns The converted CurrentWeatherRequest.
   */
  toRequestFromCoordinates = (latitude: number, longitude: number, current: string): CurrentWeatherRequest =>
    ({latitude, longitude, current} as CurrentWeatherRequest);
}
