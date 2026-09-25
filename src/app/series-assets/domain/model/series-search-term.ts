export type SeriesSearchTermId = 'star' | 'love';

export class SeriesSearchTerm {
  static readonly STAR = new SeriesSearchTerm('star', 'star');
  static readonly LOVE = new SeriesSearchTerm('love', 'love');

  private static readonly ALL: ReadonlyArray<SeriesSearchTerm> = [
    SeriesSearchTerm.STAR,
    SeriesSearchTerm.LOVE
  ];

  private constructor(
    readonly id: SeriesSearchTermId,
    readonly query: string
  ) {
  }

  static values(): ReadonlyArray<SeriesSearchTerm> {
    return SeriesSearchTerm.ALL;
  }

  static fromId(id: string): SeriesSearchTerm {
    const searchTerm = SeriesSearchTerm.ALL.find(candidate => candidate.id === id);
    if (!searchTerm) {
      throw new Error(`Unsupported series search term: ${id}`);
    }
    return searchTerm;
  }

  equals(other: SeriesSearchTerm | null | undefined): boolean {
    return !!other && this.id === other.id;
  }
}
