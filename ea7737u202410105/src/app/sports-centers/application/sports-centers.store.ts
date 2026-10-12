import {computed, inject, Service, signal} from '@angular/core';
import {forkJoin, Observable, tap} from 'rxjs';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCenterOccupancy} from '../domain/model/sports-center-occupancy';
import {ActivityType} from '../domain/model/activity-type';
import {SportsCentersService} from '../infrastructure/sports-centers.service';

/**
 * Holds sports centers application state and coordinates the reservation application layer behavior.
 */
@Service()
export class SportsCentersStore {
  private readonly sportsCentersService = inject(SportsCentersService);

  private readonly sportsCentersSignal = signal<SportsCenter[]>([]);

  /**
   * Readonly signal for the list of sports centers.
   */
  readonly sportsCenters = this.sportsCentersSignal.asReadonly();

  private readonly reservationsSignal = signal<Reservation[]>([]);

  /**
   * Readonly signal for the list of reservations.
   */
  readonly reservations = this.reservationsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Computed signal with the occupancy of every sports center according to its reservations.
   */
  readonly sportsCenterOccupancies = computed(() =>
    this.sportsCenters().map(sportsCenter => new SportsCenterOccupancy(
      sportsCenter,
      this.reservations().filter(reservation => reservation.sportsCenterId === sportsCenter.id)
    ))
  );

  /**
   * Creates an instance of SportsCentersStore and loads initial data.
   */
  constructor() {
    this.loadSportsCentersWithReservations();
  }

  /**
   * Loads all sports centers and reservations from the API.
   */
  loadSportsCentersWithReservations = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    forkJoin({
      sportsCenters: this.sportsCentersService.getSportsCenters(),
      reservations: this.sportsCentersService.getReservations()
    }).subscribe({
      next: ({sportsCenters, reservations}) => {
        this.sportsCentersSignal.set(sportsCenters);
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load sports centers'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Selects the occupancy of the sports center that offers an activity type. There is a single sports center per activity type.
   * @param activityType - Activity type.
   * @returns The sports center occupancy, or undefined when no sports center offers the activity type.
   */
  getOccupancyByActivityType = (activityType: ActivityType): SportsCenterOccupancy | undefined =>
    this.sportsCenterOccupancies().find(occupancy => occupancy.sportsCenter.activityType === activityType);

  /**
   * Adds a new reservation once it is saved by the API.
   * @param reservation - The reservation to add.
   * @returns Stream with the created reservation.
   */
  addReservation = (reservation: Reservation): Observable<Reservation> =>
    this.sportsCentersService.createReservation(reservation).pipe(
      tap(createdReservation =>
        this.reservationsSignal.update(reservations => [...reservations, createdReservation]))
    );

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
