import CandidateDTO from '@modules/candidates/dtos/CandidateDTO';
import GetBestCandidatesService from '@modules/candidates/services/GetBestCandidatesService';
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
    const service = container.resolve(GetBestCandidatesService);

    const { city, experience, technologies } = request.query;

    if (!city || !experience || !technologies)
      return response.status(400).json();

    let params = {
      city: city?.toString() ?? '',
      experience: experience?.toString() ?? '',
      technologiesNames: [] as string[],
    };
    if (Array.isArray(technologies)) {
      const technologiesArray = technologies as Array<string>;

      technologiesArray.forEach(tech => {
        params.technologiesNames.push(tech);
      });
    }

    const data = await service.execute(params);

    return response.json(data);
  }
}
