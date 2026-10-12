import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a sports center returned by the platform API.
 */
export interface SportsCenterResource extends BaseResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}

/**
 * Response envelope for sports center collection queries.
 */
export interface SportsCentersResponse extends BaseResponse {
  sportsCenters: SportsCenterResource[];
}
