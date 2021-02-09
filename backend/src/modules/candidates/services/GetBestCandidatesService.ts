import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CandidateDTO from '../dtos/CandidateDTO';
import JobMatchingCalculatorResponse from '../infra/http/JobMatchingCalculatorHttpClient/JobMatchingCalculatorResponse.interface';
import CalculateBestCandidatesService from './CalculateBestCandidatesService';
import SaveCandidatesService from './SaveCandidatesService';

// TODO: should be this format?
interface IRequest {
  // TODO: can be a number
  cityId: string;

  // TODO: Can be a range (from = 4, to = 5 <==> 4-5 years)
  // experience: string;

  startExperienceRange: number;

  endExperienceRange: number;

  // TODO: Could be { tech_id, is_main_tech }
  // technologies: RecruitingApiCandidateTechnologyDTO[];
  technologiesIds: string[];
}

/**
 * Should return best matches
 */
@injectable()
class GetBestCandidatesService {
  constructor(
    @inject('GetDataFromRecruitingApiService')
    private getDataFromRecruitingApiService: GetDataFromRecruitingApiService,

    @inject('SaveCandidatesService')
    private saveCandidatesService: SaveCandidatesService,

    @inject('CalculateBestCandidatesService')
    private calculateBestCandidatesService: CalculateBestCandidatesService,

    @inject('CitiesRepository')
    private readonly citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    cityId,
    startExperienceRange,
    endExperienceRange,
    technologiesIds,
  }: IRequest): Promise<JobMatchingCalculatorResponse> {
    const recruitingApiData = await this.getDataFromRecruitingApiService.execute();

    if (
      recruitingApiData &&
      recruitingApiData.candidates &&
      recruitingApiData.jobs
    ) {
      await this.saveCandidatesService.execute(recruitingApiData.candidates);
    }

    const city = await this.citiesRepository.findById(cityId);
    if (!city) {
      throw new AppError('Couldnt find specified city', 400);
    }

    const bestCandidates = await this.calculateBestCandidatesService.execute({
      cityId,
      startExperienceRange,
      endExperienceRange,
      technologiesIds,
      stateInitials: city.state_initials,
    });

    return bestCandidates;
  }
}

export default GetBestCandidatesService;
