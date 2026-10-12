import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {ActivityType} from '../domain/model/activity-type';
import {SportsCenterResource, SportsCentersResponse} from './sports-centers-response';

/**
 * Maps sports center entities to and from API resources.
 */
export class SportsCenterAssembler implements BaseAssembler<SportsCenter, SportsCenterResource, SportsCentersResponse> {
  /**
   * Converts a sports centers response into sports center entities.
   * @param response - API response containing sports centers.
   * @returns Array of sports center entities.
   */
  toEntitiesFromResponse(response: SportsCentersResponse): SportsCenter[] {
    return response.sportsCenters.map(resource => this.toEntityFromResource(resource));
  }

  /**
   * Converts a sports center resource into a sports center entity.
   * @param resource - Resource to convert.
   * @returns The mapped sports center entity.
   */
  toEntityFromResource(resource: SportsCenterResource): SportsCenter {
    return new SportsCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType as ActivityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    });
  }

  /**
   * Converts a sports center entity into a sports center resource.
   * @param entity - Entity to convert.
   * @returns The mapped sports center resource.
   */
  toResourceFromEntity(entity: SportsCenter): SportsCenterResource {
    return {
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude
    };
  }
}
