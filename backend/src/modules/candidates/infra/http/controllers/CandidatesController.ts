import GetBestCandidatesService from '@modules/candidates/services/GetBestCandidatesService';
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

    const {
      cityId,
      startExperienceRange,
      endExperienceRange,
      technologiesIds,
    } = request.query;

    if (!cityId || !startExperienceRange || !technologiesIds)
      return response.status(400).json();

    let params = {
      cityId: cityId?.toString() ?? '',
      startExperienceRange: startExperienceRange
        ? parseInt(startExperienceRange as string)
        : 0,
      endExperienceRange: endExperienceRange
        ? parseInt(endExperienceRange as string)
        : 0,
      technologiesIds: [] as string[],
    };
    if (Array.isArray(technologiesIds)) {
      const technologiesIdsArray = technologiesIds as Array<string>;

      technologiesIdsArray.forEach(techId => {
        params.technologiesIds.push(techId);
      });
    }

    const data = await service.execute(params);

    return response.json(data);
  }
}
