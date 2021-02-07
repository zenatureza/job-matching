import axios, { AxiosInstance, AxiosResponse, AxiosStatic } from 'axios';
import { inject, injectable } from 'tsyringe';
import IRecruitingApi from './IRecruitingApi';
import RecruitingApiResponse from './RecruitingApiResponse.interface';

// TODO: Remove magic string
@injectable()
export default class RecruitingApi implements IRecruitingApi {
  constructor(
    @inject('axios')
    private readonly httpClient: AxiosInstance,
  ) {}

  public async getData(): Promise<AxiosResponse<RecruitingApiResponse>> {
    const response = await this.httpClient.get(
      'https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json',
    );

    return response;
  }
}
