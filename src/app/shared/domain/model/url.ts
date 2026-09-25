/**
 * Value object representing an absolute URL.
 *
 * @remarks
 * Shared kernel value object used by entities of any bounded context to hold web links
 * (for example, series posters or official series websites). It validates the URL structure on
 * creation and supports an empty value to represent a missing link.
 *
 * @author Darnell Apellido
 */
export class Url {
  /** Internal URL representation. */
  readonly #value: string;

  /**
   * Creates a new Url instance.
   *
   * @param value - Absolute URL string, or an empty string when there is no link.
   * @throws Error if the value is not empty and its structure is not a valid URL.
   */
  constructor(value: string = '') {
    const trimmedValue = value.trim();
    if (trimmedValue && !Url.isValid(trimmedValue)) {
      throw new Error(`Invalid URL: ${value}`);
    }
    this.#value = trimmedValue;
  }

  /**
   * Checks whether a string is a valid absolute URL.
   *
   * @param value - The string to check.
   * @returns True if the string is a valid URL, false otherwise.
   */
  static isValid(value: string): boolean {
    return URL.canParse(value);
  }

  /**
   * Indicates whether the URL has no value.
   *
   * @returns True when the URL is empty.
   */
  get isEmpty(): boolean {
    return this.#value.length === 0;
  }

  /**
   * Compares this URL with another one by value.
   *
   * @param other - The URL to compare with.
   * @returns True if both URLs hold the same value.
   */
  equals(other: Url | null | undefined): boolean {
    return !!other && this.#value === other.toString();
  }

  /**
   * Returns the URL string.
   *
   * @returns The URL value, or an empty string when there is no link.
   */
  toString(): string {
    return this.#value;
  }
}
