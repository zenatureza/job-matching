import AppError from '@shared/errors/AppError';
import axios, { AxiosInstance, AxiosResponse, AxiosStatic } from 'axios';
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
    const apiEndpoint = process.env.RECRUITING_API_ENDPOINT;

    if (!apiEndpoint) {
      throw new AppError('Could not retreive most recent data', 500);
    }

    const response = await this.httpClient.get(apiEndpoint);

    return response;
  }
}
