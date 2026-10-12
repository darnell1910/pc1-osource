/**
 * Marker interface for HTTP response envelopes returned by API endpoints.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseResponse {}

/**
 * Base contract for API resources that expose a numeric identifier.
 */
export interface BaseResource {
  /**
   * Unique identifier of the resource.
   */
  id: number;
}
