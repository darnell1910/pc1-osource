import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCentersApiEndpoint} from './sports-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';

/**
 * Infrastructure facade for sports center and reservation endpoint operations.
 */
@Service()
export class SportsCentersApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly sportsCentersEndpoint = new SportsCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  /**
   * Retrieves all sports centers.
   * @returns Stream with the sports center collection.
   */
  getSportsCenters(): Observable<SportsCenter[]> {
    return this.sportsCentersEndpoint.getAll();
  }

  /**
   * Retrieves all reservations.
   * @returns Stream with the reservation collection.
   */
  getReservations(): Observable<Reservation[]> {
    return this.reservationsEndpoint.getAll();
  }

  /**
   * Creates a new reservation.
   * @param reservation - Reservation to create.
   * @returns Stream with the created reservation.
   */
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.reservationsEndpoint.create(reservation);
  }
}
