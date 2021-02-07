import 'reflect-metadata';

import IRecruitingApi from '@shared/infra/http/RecruitingApi/IRecruitingApi';
import RecruitingApiResponse from '@shared/infra/http/RecruitingApi/RecruitingApiResponse.interface';
import { inject, injectable } from 'tsyringe';
import RecruitingApi from '@shared/infra/http/RecruitingApi';

/**
 * This service will be used internally to update db records
 * in each recruiter request.
 */
@injectable()
class GetDataFromRecruitingApiService {
  constructor(
    @inject('RecruitingApi')
    private recruitingApi: RecruitingApi,
  ) {}

  public async execute(): Promise<RecruitingApiResponse | undefined> {
    const { data } = await this.recruitingApi.getData();

    if (!data) {
      // TODO: shoud log
      // console.log('❌ logging...');
      return;
    }

    return data;
  }
}

export default GetDataFromRecruitingApiService;
