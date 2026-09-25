import {SeriesResource} from './series-resource';

/**
 * Search result resource as returned by the series provider.
 *
 * @remarks
 * Each element of the search response contains the relevance score and the `show` object
 * with the series information.
 *
 * @author Darnell Apellido
 */
export interface SeriesSearchResultResource {
  /** Relevance of the result for the query. */
  score: number;
  /** Series information. */
  show: SeriesResource;
}

/**
 * Response contract of the series provider search endpoint.
 *
 * @remarks
 * The `/search/shows` endpoint returns a JSON array ordered by relevance.
 *
 * @author Darnell Apellido
 */
export type SearchSeriesResponse = SeriesSearchResultResource[];
