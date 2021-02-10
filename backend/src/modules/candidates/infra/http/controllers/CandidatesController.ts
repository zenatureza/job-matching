import GetBestCandidatesService from '@modules/candidates/services/GetBestCandidatesService';
import SaveCandidatesService from '@modules/candidates/services/SaveCandidatesService';
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

  public async create(request: Request, response: Response): Promise<Response> {
    const getDataFromRecruitingApiService = container.resolve(
      GetDataFromRecruitingApiService,
    );
    const saveCandidatesService = container.resolve(SaveCandidatesService);

    const recruitingApiData = await getDataFromRecruitingApiService.execute();

    if (
      recruitingApiData &&
      recruitingApiData.candidates &&
      recruitingApiData.jobs
    ) {
      await saveCandidatesService.execute(recruitingApiData.candidates);
    }

    return response.status(200).json({
      message: 'Done',
    });
  }
}
