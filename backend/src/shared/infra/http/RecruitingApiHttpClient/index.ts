import { AxiosInstance, AxiosResponse } from 'axios';
import { inject, injectable } from 'tsyringe';
import IRecruitingApi from './IRecruitingApi';
import RecruitingApiResponse from './RecruitingApiResponse.interface';

@injectable()
export default class RecruitingApiHttpClient implements IRecruitingApi {
  constructor(
    @inject('recruitingApiHttpClient')
    private readonly httpClient: AxiosInstance,
  ) {}

  public async getData(): Promise<AxiosResponse<RecruitingApiResponse>> {
    const response = await this.httpClient.get(
      'https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json',
    );

    return response;
  }
}
