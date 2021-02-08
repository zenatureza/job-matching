import { AxiosInstance, AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';
import IJobMatchingCalculatorHttpClient from './IJobMatchingCalculatorHttpClient';
import JobMatchingCalculatorResponse from './JobMatchingCalculatorResponse.interface';

// TODO: Remove magic string
@injectable()
export default class JobMatchingCalculatorHttpClient
  implements IJobMatchingCalculatorHttpClient {
  constructor(
    @inject('axios')
    private readonly httpClient: AxiosInstance,
  ) {}

  public async getData(): Promise<
    AxiosResponse<JobMatchingCalculatorResponse>
  > {
    const response = await this.httpClient.get('http://localhost:5000');

    return response;
  }
}
