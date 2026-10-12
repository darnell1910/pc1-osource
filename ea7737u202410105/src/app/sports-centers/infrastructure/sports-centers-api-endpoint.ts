import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {SportsCenterResource, SportsCentersResponse} from './sports-centers-response';
import {SportsCenterAssembler} from './sports-center-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for sports center operations.
 */
export class SportsCentersApiEndpoint extends BaseApiEndpoint<SportsCenter, SportsCenterResource, SportsCentersResponse, SportsCenterAssembler> {
  /**
   * Creates an instance of SportsCentersApiEndpoint.
   * @param http - HttpClient used to perform the requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderSportsCentersEndpointPath}`,
      new SportsCenterAssembler());
  }
}
