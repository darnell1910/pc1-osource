export interface SeriesResource {
  id: number;
  url?: string;
  name?: string;
  type?: string | null;
  language?: string | null;
  genres?: string[];
  status?: string | null;
  runtime?: number | null;
  averageRuntime?: number | null;
  premiered?: string | null;
  ended?: string | null;
  officialSite?: string | null;
  rating?: SeriesRatingResource | null;
  network?: SeriesChannelResource | null;
  webChannel?: SeriesChannelResource | null;
  image?: SeriesImageResource | null;
  summary?: string | null;
}

export interface SeriesRatingResource {
  average: number | null;
}

export interface SeriesChannelResource {
  id: number;
  name: string;
}

export interface SeriesImageResource {
  medium?: string | null;
  original?: string | null;
}
