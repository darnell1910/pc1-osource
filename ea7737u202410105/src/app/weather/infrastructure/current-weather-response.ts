/**
 * Resource with the units of the current weather variables.
 *
 * @remarks
 * Property names follow the snake_case convention of the external API provider.
 */
export interface CurrentUnitsResource {
  time: string;
  interval: string;
  temperature_2m: string;
}

/**
 * Resource with the values of the current weather variables.
 */
export interface CurrentConditionsResource {
  time: string;
  interval: number;
  temperature_2m: number;
}

/**
 * Response returned by the forecast endpoint of the external weather provider.
 */
export interface CurrentWeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnitsResource;
  current: CurrentConditionsResource;
}
