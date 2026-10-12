import {CurrentWeather} from '../domain/model/current-weather';
import {CurrentWeatherResponse} from './current-weather.response';

/**
 * Maps the external weather provider response into the current weather domain model.
 */
export class CurrentWeatherAssembler {
  /**
   * Converts a current weather response into a current weather value object.
   * @param response - Response returned by the weather provider.
   * @returns The mapped current weather.
   */
  toEntityFromResponse(response: CurrentWeatherResponse): CurrentWeather {
    return new CurrentWeather(
      response.current.temperature_2m,
      response.current_units.temperature_2m,
      new Date(response.current.time)
    );
  }
}
