import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';

/**
 * Defines conversions between domain entities and API representations.
 *
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with the endpoint.
 * @typeParam TResponse - Response envelope type returned by collection queries.
 */
export interface BaseAssembler<TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse> {
  /**
   * Converts a resource into a domain entity.
   * @param resource - Resource to convert.
   * @returns The mapped domain entity.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts a domain entity into a resource.
   * @param entity - Entity to convert.
   * @returns The mapped resource.
   */
  toResourceFromEntity(entity: TEntity): TResource;

  /**
   * Converts a response envelope into a collection of domain entities.
   * @param response - Response payload returned by the API.
   * @returns Array of mapped domain entities.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
