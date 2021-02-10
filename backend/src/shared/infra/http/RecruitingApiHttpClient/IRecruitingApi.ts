import { AxiosResponse } from 'axios';
import RecruitingApiResponse from './RecruitingApiResponse.interface';

export default interface IRecruitingApi {
  getData(): Promise<AxiosResponse<RecruitingApiResponse>>;
}
