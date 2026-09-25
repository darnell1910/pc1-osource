/**
 * Identifiers of the search terms supported by the catalogue.
 *
 * @author Darnell Apellido
 */
export type SeriesSearchTermId = 'star' | 'love';

/**
 * Value object representing a term used to search TV series in the catalogue.
 *
 * @remarks
 * The catalogue works with a closed set of search terms (Star and Love), so instances are
 * exposed as static constants and the constructor is private. Each term knows the query
 * value sent to the series provider.
 *
 * @author Darnell Apellido
 */
export class SeriesSearchTerm {
  /** Series related to the term "star". */
  static readonly STAR = new SeriesSearchTerm('star', 'star');
  /** Series related to the term "love". */
  static readonly LOVE = new SeriesSearchTerm('love', 'love');

  /** All supported search terms, in display order. */
  private static readonly ALL: ReadonlyArray<SeriesSearchTerm> = [
    SeriesSearchTerm.STAR,
    SeriesSearchTerm.LOVE
  ];

  /**
   * Creates a search term.
   *
   * @param id - Stable identifier of the search term.
   * @param query - Value sent to the provider in the `q` query parameter.
   */
  private constructor(
    readonly id: SeriesSearchTermId,
    readonly query: string
  ) {
  }

  /**
   * Returns every supported search term.
   *
   * @returns The search terms in display order.
   */
  static values(): ReadonlyArray<SeriesSearchTerm> {
    return SeriesSearchTerm.ALL;
  }

  /**
   * Finds a search term by its identifier.
   *
   * @param id - Identifier of the search term.
   * @returns The matching search term.
   * @throws Error if the identifier does not belong to a supported search term.
   */
  static fromId(id: string): SeriesSearchTerm {
    const searchTerm = SeriesSearchTerm.ALL.find(candidate => candidate.id === id);
    if (!searchTerm) {
      throw new Error(`Unsupported series search term: ${id}`);
    }
    return searchTerm;
  }

  /**
   * Compares this search term with another one by identifier.
   *
   * @param other - The search term to compare with.
   * @returns True if both search terms share the same identifier.
   */
  equals(other: SeriesSearchTerm | null | undefined): boolean {
    return !!other && this.id === other.id;
  }
}
