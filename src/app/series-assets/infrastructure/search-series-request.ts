/**
 * Request contract for the series provider search endpoint.
 *
 * @remarks
 * Groups the query parameters sent to `/search/shows`. Property names match the parameter
 * names expected by the provider.
 */
export interface SearchSeriesRequest {
  /** Search query, for example `star`. */
  q: string;
}
