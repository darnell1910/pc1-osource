/**
 * Value object with the current weather conditions of a location provided by the external weather provider.
 */
export class CurrentWeather {
  /**
   * Creates a new current weather value object.
   * @param temperature - Air temperature at 2 meters above ground.
   * @param temperatureUnit - Unit of the temperature value.
   * @param observedAt - Date and time of the observation.
   */
  constructor(
    readonly temperature: number,
    readonly temperatureUnit: string,
    readonly observedAt: Date
  ) {
  }

  /**
   * Indicates whether the temperature is a valid number.
   */
  get hasValidTemperature(): boolean {
    return Number.isFinite(this.temperature);
  }
}
