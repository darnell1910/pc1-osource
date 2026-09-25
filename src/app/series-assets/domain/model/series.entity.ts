import {Url} from '../../../shared/domain/model/url';

/**
 * Entity representing a TV series of the TVmaze catalogue.
 *
 * @remarks
 * Belongs to the Series Assets bounded context and is identified by its TVmaze show id.
 * Attribute names follow TypeScript conventions and do not depend on the naming or the
 * nesting used by the provider JSON objects (for example `image.medium` or
 * `rating.average`); the infrastructure assembler maps them.
 */
export class Series {
  /** TVmaze show identifier. */
  readonly #id: number;
  /** Name of the series. */
  readonly #name: string;
  /** Type of the series, for example `Scripted` or `Animation`, or null when unknown. */
  readonly #type: string | null;
  /** Main language of the series, or null when unknown. */
  readonly #language: string | null;
  /** Genres of the series. */
  readonly #genres: ReadonlyArray<string>;
  /** Broadcast status, for example `Running` or `Ended`, or null when unknown. */
  readonly #status: string | null;
  /** Average rating from 0 to 10, or null when the series has not been rated. */
  readonly #averageRating: number | null;
  /** Episode runtime in minutes, or null when unknown. */
  readonly #runtime: number | null;
  /** Premiere date (ISO 8601), or null when unknown. */
  readonly #premieredOn: string | null;
  /** End date (ISO 8601), or null when the series has not ended. */
  readonly #endedOn: string | null;
  /** Name of the TV network or web channel that broadcasts the series, or null when unknown. */
  readonly #networkName: string | null;
  /** Plain-text summary of the series, empty when not available. */
  readonly #summary: string;
  /** URL of the medium-size poster image, empty when the series has no image. */
  readonly #imageUrl: Url;
  /** URL of the official website of the series, empty when not available. */
  readonly #officialSiteUrl: Url;
  /** URL of the series page on TVmaze. */
  readonly #tvmazePageUrl: Url;

  /**
   * Creates a series.
   *
   * @param id - TVmaze show identifier.
   * @param name - Name of the series.
   * @param type - Type of the series, or null when unknown.
   * @param language - Main language, or null when unknown.
   * @param genres - Genres of the series.
   * @param status - Broadcast status, or null when unknown.
   * @param averageRating - Average rating from 0 to 10, or null when not rated.
   * @param runtime - Episode runtime in minutes, or null when unknown.
   * @param premieredOn - Premiere date, or null when unknown.
   * @param endedOn - End date, or null when the series has not ended.
   * @param networkName - Network or web channel name, or null when unknown.
   * @param summary - Plain-text summary, empty when not available.
   * @param imageUrl - Poster image URL, empty when the series has no image.
   * @param officialSiteUrl - Official website URL, empty when not available.
   * @param tvmazePageUrl - URL of the series page on TVmaze.
   * @throws Error if the id is not a positive integer or the rating is out of range.
   */
  constructor(
    id: number,
    name: string,
    type: string | null,
    language: string | null,
    genres: ReadonlyArray<string>,
    status: string | null,
    averageRating: number | null,
    runtime: number | null,
    premieredOn: string | null,
    endedOn: string | null,
    networkName: string | null,
    summary: string,
    imageUrl: Url,
    officialSiteUrl: Url,
    tvmazePageUrl: Url
  ) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(`Series id must be a positive integer: ${id}`);
    }
    if (averageRating !== null && (averageRating < 0 || averageRating > 10)) {
      throw new Error(`Series rating must be between 0 and 10: ${averageRating}`);
    }
    this.#id = id;
    this.#name = name.trim();
    this.#type = type?.trim() || null;
    this.#language = language?.trim() || null;
    this.#genres = genres.map(genre => genre.trim()).filter(Boolean);
    this.#status = status?.trim() || null;
    this.#averageRating = averageRating;
    this.#runtime = runtime;
    this.#premieredOn = premieredOn?.trim() || null;
    this.#endedOn = endedOn?.trim() || null;
    this.#networkName = networkName?.trim() || null;
    this.#summary = summary.trim();
    this.#imageUrl = imageUrl;
    this.#officialSiteUrl = officialSiteUrl;
    this.#tvmazePageUrl = tvmazePageUrl;
  }

  /** Gets the TVmaze show identifier. */
  get id(): number {
    return this.#id;
  }

  /** Gets the name of the series. */
  get name(): string {
    return this.#name;
  }

  /** Gets the type of the series, or null when unknown. */
  get type(): string | null {
    return this.#type;
  }

  /** Gets the main language, or null when unknown. */
  get language(): string | null {
    return this.#language;
  }

  /** Gets the genres of the series. */
  get genres(): ReadonlyArray<string> {
    return this.#genres;
  }

  /** Gets the broadcast status, or null when unknown. */
  get status(): string | null {
    return this.#status;
  }

  /** Gets the average rating, or null when the series has not been rated. */
  get averageRating(): number | null {
    return this.#averageRating;
  }

  /** Gets the episode runtime in minutes, or null when unknown. */
  get runtime(): number | null {
    return this.#runtime;
  }

  /** Gets the premiere date, or null when unknown. */
  get premieredOn(): string | null {
    return this.#premieredOn;
  }

  /** Gets the end date, or null when the series has not ended. */
  get endedOn(): string | null {
    return this.#endedOn;
  }

  /** Gets the network or web channel name, or null when unknown. */
  get networkName(): string | null {
    return this.#networkName;
  }

  /** Gets the plain-text summary, empty when not available. */
  get summary(): string {
    return this.#summary;
  }

  /** Gets the poster image URL as a string. */
  get imageUrlAsString(): string {
    return this.#imageUrl.toString();
  }

  /** Gets the official website URL as a string. */
  get officialSiteUrlAsString(): string {
    return this.#officialSiteUrl.toString();
  }

  /** Gets the TVmaze page URL as a string. */
  get tvmazePageUrlAsString(): string {
    return this.#tvmazePageUrl.toString();
  }

  /** Indicates whether the series has a name. */
  get hasName(): boolean {
    return this.#name.length > 0;
  }

  /** Indicates whether the series has a poster image. */
  get hasImage(): boolean {
    return !this.#imageUrl.isEmpty;
  }

  /** Indicates whether at least one genre is known. */
  get hasGenres(): boolean {
    return this.#genres.length > 0;
  }

  /** Indicates whether the series belongs to more than one genre. */
  get hasMultipleGenres(): boolean {
    return this.#genres.length > 1;
  }

  /** Indicates whether the series has been rated. */
  get hasRating(): boolean {
    return this.#averageRating !== null;
  }

  /** Indicates whether the series has a summary. */
  get hasSummary(): boolean {
    return this.#summary.length > 0;
  }

  /** Indicates whether the series has an official website. */
  get hasOfficialSite(): boolean {
    return !this.#officialSiteUrl.isEmpty;
  }

  /** Indicates whether the series has a TVmaze page. */
  get hasTvmazePage(): boolean {
    return !this.#tvmazePageUrl.isEmpty;
  }

  /**
   * Gets the genres joined in a single, readable text.
   *
   * @returns The genres separated by commas.
   */
  get genresAsText(): string {
    return this.#genres.join(', ');
  }

  /**
   * Compares this series with another entity based on identity.
   *
   * @param other - The series to compare with.
   * @returns True if both series share the same id.
   */
  equals(other: Series | null | undefined): boolean {
    return !!other && this.#id === other.id;
  }
}
