import { AxiosResponse } from 'axios';
import JobMatchingCalculatorResponse from './JobMatchingCalculatorResponse.interface';

export interface IRequest {
  cityId: string;
  startExperienceRange: number;
  endExperienceRange: number;
  technologiesIds: string[];
  stateInitials: string;
}

export default interface IJobMatchingCalculatorHttpClient {
  getData(
    requestData: IRequest,
  ): Promise<AxiosResponse<JobMatchingCalculatorResponse>>;
}
