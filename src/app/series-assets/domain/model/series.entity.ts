import {Url} from '../../../shared/domain/model/url';

export class Series {
  readonly #id: number;
  readonly #name: string;
  readonly #type: string | null;
  readonly #language: string | null;
  readonly #genres: ReadonlyArray<string>;
  readonly #status: string | null;
  readonly #averageRating: number | null;
  readonly #runtime: number | null;
  readonly #premieredOn: string | null;
  readonly #endedOn: string | null;
  readonly #networkName: string | null;
  readonly #summary: string;
  readonly #imageUrl: Url;
  readonly #officialSiteUrl: Url;
  readonly #tvmazePageUrl: Url;

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

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get type(): string | null {
    return this.#type;
  }

  get language(): string | null {
    return this.#language;
  }

  get genres(): ReadonlyArray<string> {
    return this.#genres;
  }

  get status(): string | null {
    return this.#status;
  }

  get averageRating(): number | null {
    return this.#averageRating;
  }

  get runtime(): number | null {
    return this.#runtime;
  }

  get premieredOn(): string | null {
    return this.#premieredOn;
  }

  get endedOn(): string | null {
    return this.#endedOn;
  }

  get networkName(): string | null {
    return this.#networkName;
  }

  get summary(): string {
    return this.#summary;
  }

  get imageUrlAsString(): string {
    return this.#imageUrl.toString();
  }

  get officialSiteUrlAsString(): string {
    return this.#officialSiteUrl.toString();
  }

  get tvmazePageUrlAsString(): string {
    return this.#tvmazePageUrl.toString();
  }

  get hasName(): boolean {
    return this.#name.length > 0;
  }

  get hasImage(): boolean {
    return !this.#imageUrl.isEmpty;
  }

  get hasGenres(): boolean {
    return this.#genres.length > 0;
  }

  get hasMultipleGenres(): boolean {
    return this.#genres.length > 1;
  }

  get hasRating(): boolean {
    return this.#averageRating !== null;
  }

  get hasSummary(): boolean {
    return this.#summary.length > 0;
  }

  get hasOfficialSite(): boolean {
    return !this.#officialSiteUrl.isEmpty;
  }

  get hasTvmazePage(): boolean {
    return !this.#tvmazePageUrl.isEmpty;
  }

  get genresAsText(): string {
    return this.#genres.join(', ');
  }

  equals(other: Series | null | undefined): boolean {
    return !!other && this.#id === other.id;
  }
}
