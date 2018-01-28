import { environment } from '../../environments/environment';
import { PredictResponse } from './predict';

export class AppSettings {
  static API_ENDPOINT = environment.api_endpoint;
  static AUTH_ENDPOINT = environment.auth_endpoint;
  static DUMP_REPORT: PredictResponse = {
    count: 90,
    travelDistance: 9,
    volume: 90,
  };
}
