import AppError from '@shared/errors/AppError';
import { recruitingApi } from '@shared/infra/http/recruitingApi';
import RecruitingApiResponse from '@shared/infra/http/recruitingApi/RecruitingApiResponse.interface';

/**
 * This service will be used internally to update db records
 * in each recruiter request.
 */
// TODO: Remove magic string
class GetDataFromRecruitingApiService {
  constructor() {}

  public async execute(): Promise<RecruitingApiResponse | undefined> {
    try {
      const { data } = await recruitingApi.get<RecruitingApiResponse>(
        '/code_challenge.json',
      );

      return data;
    } catch (error) {
      throw new AppError('Could not retreive recruiting api data.');
    }
  }
}

export default GetDataFromRecruitingApiService;
