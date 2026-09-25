import {SeriesResource} from './series-resource';

export interface SeriesSearchResultResource {
  score: number;
  show: SeriesResource;
}

export type SearchSeriesResponse = SeriesSearchResultResource[];
