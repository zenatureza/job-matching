import { AxiosResponse } from 'axios';
import IRecruitingApi from '../IRecruitingApi';
import RecruitingApiResponseInterface from '../RecruitingApiResponse.interface';

export default class RecruitingApiMock implements IRecruitingApi {
  // private httpClient;

  // constructor() {
  //   this.httpClient =
  // }

  public async getData(): Promise<
    AxiosResponse<RecruitingApiResponseInterface>
  > {
    throw new Error('Method not implemented.');
  }
}
