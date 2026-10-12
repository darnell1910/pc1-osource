import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {ReservationResource, ReservationsResponse} from './reservations-response';
import {CreateReservationRequest} from './create-reservation.request';

/**
 * Maps reservation entities to and from API resources and requests.
 */
export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource, ReservationsResponse> {
  /**
   * Converts a reservations response into reservation entities.
   * @param response - API response containing reservations.
   * @returns Array of reservation entities.
   */
  toEntitiesFromResponse(response: ReservationsResponse): Reservation[] {
    return response.reservations.map(resource => this.toEntityFromResource(resource));
  }

  /**
   * Converts a reservation resource into a reservation entity.
   * @param resource - Resource to convert.
   * @returns The mapped reservation entity.
   */
  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation({
      id: resource.id,
      sportsCenterId: resource.sportsCenterId,
      activityType: resource.activityType as ActivityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt)
    });
  }

  /**
   * Converts a reservation entity into a reservation resource.
   * @param entity - Entity to convert.
   * @returns The mapped reservation resource.
   */
  toResourceFromEntity(entity: Reservation): ReservationResource {
    return {id: entity.id, ...this.toRequestFromEntity(entity)};
  }

  /**
   * Converts a reservation entity into the request body used to create it.
   * @param entity - Entity to convert.
   * @returns The create reservation request without identifier.
   */
  toRequestFromEntity(entity: Reservation): CreateReservationRequest {
    return {
      sportsCenterId: entity.sportsCenterId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt.toISOString()
    };
  }
}
