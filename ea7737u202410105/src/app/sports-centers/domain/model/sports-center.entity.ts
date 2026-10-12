import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';

/**
 * Represents a sports center specialized in a single activity type with a maximum capacity of participants.
 */
export class SportsCenter implements BaseEntity {
  #id: number;
  #name: string;
  #activityType: ActivityType;
  #capacity: number;
  #latitude: number;
  #longitude: number;

  /**
   * Creates a new sports center entity.
   * @param sportsCenter - Initialization values.
   */
  constructor(sportsCenter: {
    id: number;
    name: string;
    activityType: ActivityType;
    capacity: number;
    latitude: number;
    longitude: number;
  }) {
    this.#id = sportsCenter.id;
    this.#name = sportsCenter.name;
    this.#activityType = sportsCenter.activityType;
    this.#capacity = sportsCenter.capacity;
    this.#latitude = sportsCenter.latitude;
    this.#longitude = sportsCenter.longitude;
  }

  /**
   * Unique identifier of the sports center.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Name of the sports center.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Activity type in which the sports center specializes.
   */
  get activityType(): ActivityType {
    return this.#activityType;
  }

  /**
   * Maximum number of participants supported by the sports center.
   */
  get capacity(): number {
    return this.#capacity;
  }

  /**
   * Latitude of the sports center location.
   */
  get latitude(): number {
    return this.#latitude;
  }

  /**
   * Longitude of the sports center location.
   */
  get longitude(): number {
    return this.#longitude;
  }

  /**
   * Calculates the remaining capacity for a given number of registered participants.
   * @param totalParticipants - Participants already registered in the sports center.
   * @returns The capacity minus the registered participants.
   */
  calculateAvailableCapacity(totalParticipants: number): number {
    return this.#capacity - totalParticipants;
  }
}
