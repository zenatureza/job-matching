import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CandidatesController {
  /**
   *
   * @param request { city, experience, technologies }
   * @param response { best_matches }
   */
  public async get(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetDataFromRecruitingApiService);

    const data = await service.execute();

    return response.json(data);
  }
}
