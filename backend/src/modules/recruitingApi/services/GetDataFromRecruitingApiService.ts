import RecruitingApiHttpClient from '@shared/infra/http/RecruitingApiHttpClient/index';
import RecruitingApiResponse from '@shared/infra/http/RecruitingApiHttpClient/RecruitingApiResponse.interface';
import { inject, injectable } from 'tsyringe';

/**
 * This service will be used internally to update db records
 * in each recruiter request.
 */
@injectable()
class GetDataFromRecruitingApiService {
  constructor(
    @inject('RecruitingApi')
    private recruitingApi: RecruitingApiHttpClient,
  ) {}

  public async execute(): Promise<RecruitingApiResponse | undefined> {
    const { data } = await this.recruitingApi.getData();

    if (!data) {
      return;
    }

    return data;
  }
}

export default GetDataFromRecruitingApiService;
