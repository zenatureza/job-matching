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
    // const service = container.resolve(GetDataFromRecruitingApiService);

    // const data = await service.execute();

    const service = container.resolve(GetBestCandidatesService);

    const { city, experience, technologies } = request.query;
    // console.log(city, experience, technologies);

    if (!city || !experience || !technologies)
      return response.status(400).json();

    let params: CandidateDTO = {
      city: city?.toString() ?? '',
      experience: experience?.toString() ?? '',
      technologies: [],
      // technologies: technologies.map,
    };
    if (Array.isArray(technologies)) {
      const technologiesArray = technologies as Array<string>;

      technologiesArray.forEach(tech => {
        params.technologies.push({
          name: tech,
        });
      });
    }

    const data = await service.execute(params);

    return response.json(data);
  }
}
