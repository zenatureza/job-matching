import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CandidateDTO from '../dtos/CandidateDTO';
import JobMatchingCalculatorResponse from '../infra/http/JobMatchingCalculatorHttpClient/JobMatchingCalculatorResponse.interface';
import CalculateBestCandidatesService from './CalculateBestCandidatesService';
import SaveCandidatesService from './SaveCandidatesService';

interface IRequest {
  cityId: string;
  startExperienceRange: number;
  endExperienceRange: number;
  technologiesIds: string[];
}

/**
 * Should return best matches
 */
@injectable()
class GetBestCandidatesService {
  constructor(
    @inject('GetDataFromRecruitingApiService')
    private readonly getDataFromRecruitingApiService: GetDataFromRecruitingApiService,

    @inject('SaveCandidatesService')
    private readonly saveCandidatesService: SaveCandidatesService,

    @inject('CalculateBestCandidatesService')
    private readonly calculateBestCandidatesService: CalculateBestCandidatesService,

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
