/**
 * Series (show) resource as returned by the TVmaze API.
 *
 * @remarks
 * Mirrors the `show` JSON object returned by the search endpoint and by the
 * `/shows/{id}` endpoint. Only the members used by the application are declared. The
 * `SeriesAssembler` flattens the nested objects (image, rating, network) and maps the
 * resource to the `Series` entity, so this structure does not leak into the domain model.
 *
 * @author Darnell Apellido
 */
export interface SeriesResource {
  /** TVmaze show identifier. */
  id: number;
  /** URL of the show page on TVmaze. */
  url?: string;
  /** Name of the show. */
  name?: string;
  /** Type of the show, for example `Scripted`. */
  type?: string | null;
  /** Main language of the show. */
  language?: string | null;
  /** Genres of the show. */
  genres?: string[];
  /** Broadcast status of the show. */
  status?: string | null;
  /** Episode runtime in minutes. */
  runtime?: number | null;
  /** Average episode runtime in minutes. */
  averageRuntime?: number | null;
  /** Premiere date (ISO 8601). */
  premiered?: string | null;
  /** End date (ISO 8601). */
  ended?: string | null;
  /** Official website of the show. */
  officialSite?: string | null;
  /** Rating of the show. */
  rating?: SeriesRatingResource | null;
  /** TV network that broadcasts the show. */
  network?: SeriesChannelResource | null;
  /** Web channel that streams the show. */
  webChannel?: SeriesChannelResource | null;
  /** Poster images of the show. */
  image?: SeriesImageResource | null;
  /** HTML summary of the show. */
  summary?: string | null;
}

/**
 * Rating resource nested in a series resource.
 *
 * @remarks
 * The average is null when the show has not been rated.
 *
 * @author Darnell Apellido
 */
export interface SeriesRatingResource {
  /** Average rating from 0 to 10. */
  average: number | null;
}

/**
 * Network or web channel resource nested in a series resource.
 *
 * @remarks
 * Only the name is used by the application.
 *
 * @author Darnell Apellido
 */
export interface SeriesChannelResource {
  /** TVmaze channel identifier. */
  id: number;
  /** Name of the network or web channel. */
  name: string;
}

/**
 * Image resource nested in a series resource.
 *
 * @remarks
 * Contains the absolute URLs of the medium-size and original poster images.
 *
 * @author Darnell Apellido
 */
export interface SeriesImageResource {
  /** URL of the medium-size poster image. */
  medium?: string | null;
  /** URL of the original poster image. */
  original?: string | null;
}
