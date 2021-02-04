import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import AppError from '@shared/errors/AppError';
import { recruitingApi } from '@shared/infra/http/recruitingApi';
import RecruitingApiResponse from '@shared/infra/http/recruitingApi/RecruitingApiResponse.interface';
import { inject, injectable } from 'tsyringe';
import CandidateDTO from '../dtos/CandidateDTO';

// TODO: should be this format?
interface IRequest {
  // TODO: can be a number
  city: string;

  // TODO: Can be a range (from = 4, to = 5 <==> 4-5 years)
  experience: string;

  // TODO: Could be { tech_id, is_main_tech }
  technologies: RecruitingApiCandidateTechnologyDTO[];
}

/**
 * Should return best matches
 */
@injectable()
class GetBestCandidatesService {
  constructor(
    @inject('GetDataFromRecruitingApiService')
    private getDataFromRecruitingApiService: GetDataFromRecruitingApiService,
  ) {}

  public async execute({
    city,
    experience,
    technologies,
  }: IRequest): Promise<CandidateDTO[] | undefined> {
    try {
      const recruitingApiData = await this.getDataFromRecruitingApiService.execute();

      if (
        recruitingApiData &&
        recruitingApiData.candidates &&
        recruitingApiData.jobs
      ) {
        await this.updateCandidatesService.execute(
          recruitingApiData.candidates,
        );
        await this.updateJobsService.execute(recruitingApiData.jobs);
      }
    } catch (error) {
      // TODO: handle could not get most updated data - should not stop program execution
    } finally {
      // TODO: Should call python api?
      const bestCandidates = await this.calculateBestCandidatesService.execute(
        city,
        experience,
        technologies,
      );

      return bestCandidates;
    }
  }
}

export default GetBestCandidatesService;