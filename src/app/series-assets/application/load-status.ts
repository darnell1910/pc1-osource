/**
 * Loading status of the data requested to the series provider.
 *
 * @remarks
 * - `idle`: the data has not been requested yet.
 * - `loading`: the request is in progress.
 * - `loaded`: the data was retrieved successfully.
 * - `failed`: the request failed and can be retried.
 */
export type LoadStatus = 'idle' | 'loading' | 'loaded' | 'failed';
