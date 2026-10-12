import {SportsCenter} from './sports-center.entity';
import {Reservation} from './reservation.entity';

/**
 * Value object that represents the occupancy of a sports center based on all of its reservations.
 *
 * @remarks
 * Capacity is calculated by accumulating every reservation of the sports center, without distinguishing dates or shifts.
 */
export class SportsCenterOccupancy {
  /**
   * Creates a new sports center occupancy.
   * @param sportsCenter - Sports center whose occupancy is calculated.
   * @param reservations - Reservations registered for the sports center.
   */
  constructor(
    readonly sportsCenter: SportsCenter,
    readonly reservations: readonly Reservation[]
  ) {
  }

  /**
   * Sum of participants for all the reservations of the sports center.
   */
  get totalParticipants(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  /**
   * Capacity of the sports center minus the total of registered participants.
   */
  get availableCapacity(): number {
    return this.sportsCenter.calculateAvailableCapacity(this.totalParticipants);
  }

  /**
   * Indicates whether the sports center has no registered reservations.
   */
  get isEmpty(): boolean {
    return this.reservations.length === 0;
  }

  /**
   * Checks whether a number of participants can be registered in the sports center.
   * @param participants - Number of participants to register.
   * @returns True when participants is greater than zero and does not exceed the available capacity.
   */
  canAccommodate(participants: number): boolean {
    return participants > 0 && participants <= this.availableCapacity;
  }
}
