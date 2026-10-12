import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';

/**
 * Represents a reservation of participants for an activity in a sports center.
 */
export class Reservation implements BaseEntity {
  #id: number;
  #sportsCenterId: number;
  #activityType: ActivityType;
  #participantName: string;
  #participants: number;
  #weatherTemperature: number;
  #reservedAt: Date;

  /**
   * Creates a new reservation entity.
   * @param reservation - Initialization values. The id is assigned by the backend when the reservation is created.
   */
  constructor(reservation: {
    id?: number;
    sportsCenterId: number;
    activityType: ActivityType;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
  }) {
    this.#id = reservation.id ?? 0;
    this.#sportsCenterId = reservation.sportsCenterId;
    this.#activityType = reservation.activityType;
    this.#participantName = reservation.participantName;
    this.#participants = reservation.participants;
    this.#weatherTemperature = reservation.weatherTemperature;
    this.#reservedAt = reservation.reservedAt;
  }

  /**
   * Unique identifier of the reservation.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Identifier of the sports center associated with the reservation.
   */
  get sportsCenterId(): number {
    return this.#sportsCenterId;
  }

  /**
   * Activity type of the reservation.
   */
  get activityType(): ActivityType {
    return this.#activityType;
  }

  /**
   * Name of the participant responsible for the reservation.
   */
  get participantName(): string {
    return this.#participantName;
  }

  /**
   * Number of attendees included in the reservation.
   */
  get participants(): number {
    return this.#participants;
  }

  /**
   * Temperature registered at the sports center location when the reservation was created.
   */
  get weatherTemperature(): number {
    return this.#weatherTemperature;
  }

  /**
   * Date and time when the reservation was created.
   */
  get reservedAt(): Date {
    return this.#reservedAt;
  }
}
