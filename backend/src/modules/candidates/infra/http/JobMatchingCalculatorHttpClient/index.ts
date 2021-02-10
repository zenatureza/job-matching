import { AxiosInstance, AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';
import IJobMatchingCalculatorHttpClient, {
  IRequest,
} from './IJobMatchingCalculatorHttpClient';
import JobMatchingCalculatorResponse from './JobMatchingCalculatorResponse.interface';

@injectable()
export default class JobMatchingCalculatorHttpClient
  implements IJobMatchingCalculatorHttpClient {
  constructor(
    @inject('jobMatchingCalculatorHttpClient')
    private readonly httpClient: AxiosInstance,
  ) {}

  public async getData({
    cityId,
    startExperienceRange,
    endExperienceRange,
    technologiesIds,
    stateInitials,
  }: IRequest): Promise<AxiosResponse<JobMatchingCalculatorResponse>> {
    try {
      const response = await this.httpClient.get('/', {
        params: {
          cityId,
          startExperienceRange,
          endExperienceRange,
          technologiesIds,
          stateInitials,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }

    return [] as any;
  }
}
