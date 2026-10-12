import {computed, inject, Service, signal} from '@angular/core';
import {forkJoin, Observable, tap} from 'rxjs';
import {SportsCentersApi} from '../infrastructure/sports-centers-api';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCenterOccupancy} from '../domain/model/sports-center-occupancy';
import {ActivityType} from '../domain/model/activity-type';

/**
 * Holds the sports centers application state and coordinates the reservation use cases.
 */
@Service()
export class SportsCentersStore {
  private readonly sportsCentersApi = inject(SportsCentersApi);

  private readonly sportsCentersSignal = signal<SportsCenter[]>([]);
  private readonly reservationsSignal = signal<Reservation[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal with the registered sports centers.
   */
  readonly sportsCenters = this.sportsCentersSignal.asReadonly();

  /**
   * Readonly signal with the registered reservations.
   */
  readonly reservations = this.reservationsSignal.asReadonly();

  /**
   * Readonly signal indicating whether data is being loaded.
   */
  readonly loading = this.loadingSignal.asReadonly();

  /**
   * Readonly signal with the current load error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Computed occupancy of every sports center with its reservations.
   */
  readonly sportsCenterOccupancies = computed(() =>
    this.sportsCenters().map(sportsCenter => new SportsCenterOccupancy(
      sportsCenter,
      this.reservations().filter(reservation => reservation.sportsCenterId === sportsCenter.id)
    ))
  );

  /**
   * Creates an instance of SportsCentersStore and loads the initial data.
   */
  constructor() {
    this.loadSportsCentersWithReservations();
  }

  /**
   * Loads the sports centers and their reservations from the API.
   */
  loadSportsCentersWithReservations(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    forkJoin({
      sportsCenters: this.sportsCentersApi.getSportsCenters(),
      reservations: this.sportsCentersApi.getReservations()
    }).subscribe({
      next: ({sportsCenters, reservations}) => {
        this.sportsCentersSignal.set(sportsCenters);
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
      },
      error: (error: unknown) => {
        this.errorSignal.set(this.formatError(error, 'Failed to load sports centers'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Finds the occupancy of the sports center that offers an activity type. There is a single sports center per activity type.
   * @param activityType - Selected activity type.
   * @returns The sports center occupancy, or undefined when no sports center offers the activity type.
   */
  getOccupancyByActivityType(activityType: ActivityType): SportsCenterOccupancy | undefined {
    return this.sportsCenterOccupancies().find(occupancy => occupancy.sportsCenter.activityType === activityType);
  }

  /**
   * Creates a reservation and adds it to the state once it is saved.
   * @param reservation - Reservation to create.
   * @returns Stream with the created reservation.
   */
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.sportsCentersApi.createReservation(reservation).pipe(
      tap(createdReservation =>
        this.reservationsSignal.update(reservations => [...reservations, createdReservation]))
    );
  }

  /**
   * Normalizes unknown errors into a message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
