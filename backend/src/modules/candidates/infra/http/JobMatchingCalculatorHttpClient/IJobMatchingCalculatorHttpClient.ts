import { AxiosResponse } from 'axios';
import JobMatchingCalculatorResponse from './JobMatchingCalculatorResponse.interface';

export default interface IJobMatchingCalculatorHttpClient {
  getData(): Promise<AxiosResponse<JobMatchingCalculatorResponse>>;
}
