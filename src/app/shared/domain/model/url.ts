export class Url {
  readonly #value: string;

  constructor(value: string = '') {
    const trimmedValue = value.trim();
    if (trimmedValue && !Url.isValid(trimmedValue)) {
      throw new Error(`Invalid URL: ${value}`);
    }
    this.#value = trimmedValue;
  }

  static isValid(value: string): boolean {
    return URL.canParse(value);
  }

  get isEmpty(): boolean {
    return this.#value.length === 0;
  }

  equals(other: Url | null | undefined): boolean {
    return !!other && this.#value === other.toString();
  }

  toString(): string {
    return this.#value;
  }
}
