import {inject, Service} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {HttpClient} from '@angular/common/http';
import {SportsCentersApiEndpoint} from './sports-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';
import {Observable} from 'rxjs';

/**
 * Infrastructure facade for sports center and reservation endpoint operations.
 */
@Service()
export class SportsCentersService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly sportsCentersEndpoint = new SportsCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  /**
   * Retrieves all sports centers.
   * @returns Stream with the sports center collection.
   */
  getSportsCenters = (): Observable<SportsCenter[]> =>
    this.sportsCentersEndpoint.getAll();

  /**
   * Retrieves all reservations.
   * @returns Stream with the reservation collection.
   */
  getReservations = (): Observable<Reservation[]> =>
    this.reservationsEndpoint.getAll();

  /**
   * Creates a new reservation.
   * @param reservation - The reservation to create.
   * @returns An Observable of the created Reservation object.
   */
  createReservation = (reservation: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.create(reservation);
}
