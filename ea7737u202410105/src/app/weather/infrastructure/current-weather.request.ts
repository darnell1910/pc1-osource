/**
 * Request parameters used to query the current weather of a location.
 */
export interface CurrentWeatherRequest {
  latitude: number;
  longitude: number;
  current: string;
}
